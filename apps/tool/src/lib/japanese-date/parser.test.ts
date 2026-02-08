import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { parseInput } from "./parser";

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 0, 25)); // Jan 25, 2026
});

afterAll(() => {
  vi.useRealTimers();
});

const CURRENT_YEAR = 2026;

describe("parseInput", () => {
  it.each<[string, number, number, number, string]>([
    // MMDD compact format
    ["0225", CURRENT_YEAR, 1, 25, "MMDD basic"],
    ["1231", CURRENT_YEAR, 11, 31, "MMDD December"],
    ["０２２５", CURRENT_YEAR, 1, 25, "MMDD fullwidth"],

    // M/D short format
    ["2/25", CURRENT_YEAR, 1, 25, "M/D slash"],
    ["12-31", CURRENT_YEAR, 11, 31, "M-D dash"],
    ["２/２５", CURRENT_YEAR, 1, 25, "M/D fullwidth"],

    // Japanese month-day format
    ["2月25日", CURRENT_YEAR, 1, 25, "Japanese month-day"],
    ["12月31日", CURRENT_YEAR, 11, 31, "Japanese month-day December"],
    ["２月２５日", CURRENT_YEAR, 1, 25, "Japanese month-day fullwidth"],

    // YYYYMMDD compact
    ["19970224", 1997, 1, 24, "YYYYMMDD"],
    ["１９９７０２２４", 1997, 1, 24, "YYYYMMDD fullwidth"],

    // Year only
    ["2025", 2025, 0, 1, "Year only"],
    ["1990", 1990, 0, 1, "Year only 1990"],
    ["1868", 1868, 0, 1, "Year only Meiji start"],

    // ISO format
    ["2024-01-15", 2024, 0, 15, "ISO format"],
    ["2024/12/31", 2024, 11, 31, "ISO with slash"],
  ])("parses %s as western date (%s)", (input, expectedYear, expectedMonth, expectedDay) => {
    const result = parseInput(input);
    expect(result.type).toBe("western");
    if (result.type !== "western") return;

    // Guard above narrows type; westernDate is always present for "western" results
    expect(result.westernDate?.getFullYear()).toBe(expectedYear);
    expect(result.westernDate?.getMonth()).toBe(expectedMonth);
    expect(result.westernDate?.getDate()).toBe(expectedDay);
  });

  it.each<[string, string]>([
    ["1332", "invalid month 13"],
    ["0230", "Feb 30 does not exist"],
    ["0000", "month 0 invalid"],
  ])("rejects invalid date %s (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("invalid");
  });

  it.each<[string, string, number, number, number]>([
    ["令和6年1月15日", "令和", 6, 1, 15],
    ["平成31年4月30日", "平成", 31, 4, 30],
    ["昭和64年1月7日", "昭和", 64, 1, 7],
  ])("parses Japanese era %s", (input, eraName, year, month, day) => {
    const result = parseInput(input);
    expect(result.type).toBe("japanese");
    if (result.type !== "japanese") return;

    // Guard above narrows type; japaneseDate is always present for "japanese" results
    expect(result.japaneseDate?.era.name).toBe(eraName);
    expect(result.japaneseDate?.year).toBe(year);
    expect(result.japaneseDate?.month).toBe(month);
    expect(result.japaneseDate?.day).toBe(day);
  });

  it.each<[string, string]>([
    ["6", "ambiguous single digit — could be multiple eras"],
    ["3", "ambiguous single digit — valid in multiple eras"],
  ])("parses %s as ambiguous (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("ambiguous");
    expect(result.alternativeInterpretations).toBeDefined();
    expect(result.alternativeInterpretations?.length).toBeGreaterThan(0);
  });

  it.each<[string, string]>([
    ["", "empty string"],
    ["   ", "whitespace only"],
  ])("parses %s as empty (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("empty");
  });
});
