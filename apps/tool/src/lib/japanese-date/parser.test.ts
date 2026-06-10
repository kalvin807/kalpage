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

describe("parseInput western dates", () => {
  it.each<[string, number, number, number, string]>([
    // MMDD compact format
    ["0225", CURRENT_YEAR, 1, 25, "MMDD basic"],
    ["1231", CURRENT_YEAR, 11, 31, "MMDD December"],
    ["０２２５", CURRENT_YEAR, 1, 25, "MMDD fullwidth"],

    // M/D short format
    ["2/25", CURRENT_YEAR, 1, 25, "M/D slash"],
    ["12-31", CURRENT_YEAR, 11, 31, "M-D dash"],
    ["2.25", CURRENT_YEAR, 1, 25, "M.D dot"],
    ["２/２５", CURRENT_YEAR, 1, 25, "M/D fullwidth"],

    // Japanese month-day format
    ["2月25日", CURRENT_YEAR, 1, 25, "Japanese month-day"],
    ["12月31日", CURRENT_YEAR, 11, 31, "Japanese month-day December"],
    ["２月２５日", CURRENT_YEAR, 1, 25, "Japanese month-day fullwidth"],
    ["二月二十五日", CURRENT_YEAR, 1, 25, "Japanese month-day kanji"],

    // English month-day (assumes current year)
    ["March 8", CURRENT_YEAR, 2, 8, "English month-day"],
    ["mar 8th", CURRENT_YEAR, 2, 8, "English month-day abbreviated ordinal"],

    // YYYYMMDD compact
    ["19970224", 1997, 1, 24, "YYYYMMDD"],
    ["１９９７０２２４", 1997, 1, 24, "YYYYMMDD fullwidth"],

    // ISO and friends
    ["2024-01-15", 2024, 0, 15, "ISO format"],
    ["2024/12/31", 2024, 11, 31, "ISO with slash"],
    ["2024.1.15", 2024, 0, 15, "ISO with dots"],
    ["2024-01-15T10:30:00", 2024, 0, 15, "ISO datetime"],
    ["2024-01-15 10:30", 2024, 0, 15, "ISO with time"],

    // Japanese-style western dates
    ["2024年1月15日", 2024, 0, 15, "year-month-day with kanji units"],
    ["西暦2024年1月15日", 2024, 0, 15, "with 西暦 prefix"],
    ["２０２４年１月１５日", 2024, 0, 15, "fullwidth year-month-day"],

    // English textual dates
    ["January 15, 2024", 2024, 0, 15, "US style"],
    ["Jan 15 2024", 2024, 0, 15, "US style abbreviated"],
    ["January 15th, 2024", 2024, 0, 15, "US style ordinal"],
    ["15 January 2024", 2024, 0, 15, "EU style"],
    ["15th Jan, 2024", 2024, 0, 15, "EU style ordinal"],

    // Relative keywords (system time is Jan 25, 2026)
    ["今日", 2026, 0, 25, "today kanji"],
    ["today", 2026, 0, 25, "today english"],
    ["昨日", 2026, 0, 24, "yesterday kanji"],
    ["明日", 2026, 0, 26, "tomorrow kanji"],
    ["一昨日", 2026, 0, 23, "day before yesterday"],
    ["明後日", 2026, 0, 27, "day after tomorrow"],
  ])("parses %s as western date (%s)", (input, expectedYear, expectedMonth, expectedDay) => {
    const result = parseInput(input);
    expect(result.type).toBe("western");
    if (result.type !== "western") return;

    expect(result.westernDate?.getFullYear()).toBe(expectedYear);
    expect(result.westernDate?.getMonth()).toBe(expectedMonth);
    expect(result.westernDate?.getDate()).toBe(expectedDay);
  });

  it.each<[string, "year" | "month" | "day", string]>([
    ["2025", "year", "year only"],
    ["2024-03", "month", "year-month"],
    ["2024年3月", "month", "Japanese year-month"],
    ["March 2024", "month", "English month-year"],
    ["2024-03-15", "day", "full date"],
    ["今日", "day", "relative keyword"],
  ])("parses %s with precision %s (%s)", (input, expectedPrecision) => {
    const result = parseInput(input);
    expect(result.type).toBe("western");
    expect(result.precision).toBe(expectedPrecision);
  });
});

describe("parseInput invalid dates", () => {
  it.each<[string, string]>([
    ["1332", "invalid month 13 falls through to pre-Meiji year"],
    ["0230", "Feb 30 does not exist"],
    ["0000", "month 0 invalid"],
    ["2024-13-01", "month 13"],
    ["2024-02-30", "Feb 30"],
    ["1867", "before Meiji"],
    ["平成32年", "Heisei ended at 31"],
    ["昭和65年", "Showa ended at 64"],
    ["昭和64年1月8日", "Showa 64 ended Jan 7"],
    ["平成31年5月1日", "Heisei 31 ended Apr 30"],
    ["令和元年4月30日", "Reiwa started May 1"],
    ["明治1年10月22日", "Meiji started Oct 23"],
    ["hello world", "not a date"],
  ])("rejects %s (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("invalid");
    expect(result.error).toBeDefined();
  });

  it("reports the era year range for out-of-range era years", () => {
    const result = parseInput("平成32年");
    expect(result.error).toContain("31");
  });

  it("reports the era end date for out-of-range full dates", () => {
    const result = parseInput("昭和64年1月8日");
    expect(result.error).toContain("1月7日");
  });
});

describe("parseInput Japanese era dates", () => {
  it.each<[string, string, number, number | undefined, number | undefined]>([
    // Kanji era names
    ["令和6年1月15日", "令和", 6, 1, 15],
    ["平成31年4月30日", "平成", 31, 4, 30],
    ["昭和64年1月7日", "昭和", 64, 1, 7],
    ["令和6年", "令和", 6, undefined, undefined],
    ["令和6年1月", "令和", 6, 1, undefined],

    // Gannen
    ["令和元年", "令和", 1, undefined, undefined],
    ["令和元年5月1日", "令和", 1, 5, 1],
    ["平成元年", "平成", 1, undefined, undefined],

    // Kanji numerals
    ["令和六年一月十五日", "令和", 6, 1, 15],
    ["昭和六十四年一月七日", "昭和", 64, 1, 7],

    // Abbreviations with various separators
    ["R6", "令和", 6, undefined, undefined],
    ["r6", "令和", 6, undefined, undefined],
    ["R6.1.15", "令和", 6, 1, 15],
    ["H31/4/30", "平成", 31, 4, 30],
    ["S64-1-7", "昭和", 64, 1, 7],
    ["R06.01.15", "令和", 6, 1, 15],
    ["R6年1月15日", "令和", 6, 1, 15],
    ["R元年", "令和", 1, undefined, undefined],
    ["Ｒ６", "令和", 6, undefined, undefined],

    // Romaji
    ["Reiwa 6", "令和", 6, undefined, undefined],
    ["reiwa6", "令和", 6, undefined, undefined],
    ["Reiwa 6, January 15", "令和", 6, 1, 15],
    ["reiwa 6 jan 15", "令和", 6, 1, 15],
  ])("parses %s as era date", (input, eraName, year, month, day) => {
    const result = parseInput(input);
    expect(result.type).toBe("japanese");
    if (result.type !== "japanese") return;

    expect(result.japaneseDate?.era.name).toBe(eraName);
    expect(result.japaneseDate?.year).toBe(year);
    expect(result.japaneseDate?.month).toBe(month);
    expect(result.japaneseDate?.day).toBe(day);
  });
});

describe("parseInput ambiguous era years", () => {
  it.each<[string, string]>([
    ["6", "bare number valid in multiple eras"],
    ["3", "bare number valid in multiple eras"],
    ["6年1月", "era-less year-month"],
    ["6年1月15日", "era-less full date"],
  ])("parses %s as ambiguous (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("ambiguous");
    expect(result.alternativeInterpretations).toBeDefined();
    expect(result.alternativeInterpretations?.length).toBeGreaterThan(0);
  });

  it("offers gannen interpretations for input 1", () => {
    const result = parseInput("1");
    expect(result.type).toBe("ambiguous");
    const labels = result.alternativeInterpretations?.map((alt) => alt.label) ?? [];
    expect(labels).toContain("令和元年");
    expect(labels).toContain("平成元年");
  });

  it("excludes eras where the year is out of range", () => {
    const result = parseInput("40");
    expect(result.type).toBe("ambiguous");
    const eraNames = result.alternativeInterpretations?.map((alt) => alt.japanese?.era.name) ?? [];
    // 平成 ended at 31, 大正 at 15: year 40 only fits 令和 (open), 昭和 (64), 明治 (45)
    expect(eraNames).not.toContain("平成");
    expect(eraNames).not.toContain("大正");
    expect(eraNames).toContain("昭和");
  });
});

describe("parseInput empty input", () => {
  it.each<[string, string]>([
    ["", "empty string"],
    ["   ", "whitespace only"],
    ["　", "fullwidth space"],
  ])("parses %s as empty (%s)", (input) => {
    const result = parseInput(input);
    expect(result.type).toBe("empty");
  });
});
