import { describe, it, expect } from "vitest";
import { maybeToWestern, maybeToJapanese } from "./converter";
import { maybeFindEraByName } from "./eras";

function era(name: string) {
  const found = maybeFindEraByName(name);
  if (!found) throw new Error(`unreachable: unknown era ${name}`);
  return found;
}

describe("maybeToWestern", () => {
  it.each<[string, number, number | undefined, number | undefined, string]>([
    // Partial era dates are valid even when their representative date precedes
    // the era start (令和元年 begins May 1, but the era year covers all of 2019).
    ["令和", 1, undefined, undefined, "2019"],
    ["令和", 1, 5, 1, "2019-05-01"],
    ["平成", 31, 4, 30, "2019-04-30"],
    ["昭和", 64, 1, 7, "1989-01-07"],
    ["令和", 6, 1, 15, "2024-01-15"],
    ["平成", 1, undefined, undefined, "1989"],
  ])("converts %s %s/%s/%s to %s", (eraName, year, month, day, expectedISO) => {
    const result = maybeToWestern({ era: era(eraName), year, month, day });
    expect(result?.iso).toBe(expectedISO);
  });

  it.each<[string, number, number | undefined, number | undefined, string]>([
    ["平成", 32, undefined, undefined, "year beyond era end"],
    ["昭和", 64, 1, 8, "day beyond era end"],
    ["令和", 1, 4, 30, "day before era start"],
    ["令和", 0, undefined, undefined, "year zero"],
  ])("rejects %s %s/%s/%s (%s)", (eraName, year, month, day) => {
    const result = maybeToWestern({ era: era(eraName), year, month, day });
    expect(result).toBeNull();
  });
});

describe("maybeToJapanese", () => {
  it.each<[number, number, number, string]>([
    [2019, 4, 30, "平成31年4月30日"],
    [2019, 5, 1, "令和元年5月1日"],
    [1989, 1, 7, "昭和64年1月7日"],
    [1989, 1, 8, "平成元年1月8日"],
    [2024, 1, 15, "令和6年1月15日"],
  ])("converts %s-%s-%s to %s", (year, month, day, expected) => {
    const result = maybeToJapanese(new Date(year, month - 1, day));
    expect(result?.formatted).toBe(expected);
  });

  it("returns null for pre-Meiji dates", () => {
    expect(maybeToJapanese(new Date(1868, 0, 1))).toBeNull();
  });
});
