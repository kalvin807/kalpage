import type { DatePrecision, JapaneseEra, ParsedInput } from "./types";
import { isEraYearValid, JAPANESE_ERAS, maybeFindEraByName, maybeFindEraForDate, maybeGetEraMaxYear } from "./eras";

// ---------------------------------------------------------------------------
// The parser is a pipeline of small matchers tried in order of specificity.
// Each matcher either claims the input (returning a result, possibly invalid
// with a targeted error message) or passes by returning null.
// ---------------------------------------------------------------------------

const ERR = {
  invalidDate: "無効な日付です。正しい日付を入力してください。",
  invalidMonthDay: "無効な日付です。正しい月日を入力してください。",
  invalidMonth: "無効な月です。1から12の間で入力してください。",
  preMeiji: "明治以前の日付には対応していません。1868年以降の日付を入力してください。",
  unparsable: "入力を日付として解釈できませんでした。形式を確認してください。",
} as const;

// Regex capture groups are guaranteed non-undefined after a successful match
function group(value: string | undefined): string {
  if (value === undefined) throw new Error("unreachable: missing regex capture group");
  return value;
}

// --- Normalization ---------------------------------------------------------

/**
 * Maps fullwidth digits/letters and the separator characters commonly produced
 * by Japanese IMEs onto their ASCII equivalents, so every matcher downstream
 * only deals with one representation.
 */
function normalizeInput(raw: string): string {
  return raw
    .trim()
    .replace(/[０-９Ａ-Ｚａ-ｚ]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0))
    .replace(/／/g, "/")
    .replace(/．/g, ".")
    .replace(/[－−‐]/g, "-")
    .replace(/[、，]/g, ",")
    .replace(/^西暦\s*/, "")
    .replace(/[\s\u3000]+/g, " ");
}

// --- Kanji numerals --------------------------------------------------------

const KANJI_DIGITS: Readonly<Record<string, number>> = {
  〇: 0,
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
};

/**
 * Converts a numeric token to a number. Supports ASCII digits, positional
 * kanji (二〇二四 = 2024), and tens-style kanji (二十六 = 26, 十 = 10).
 */
function maybeTokenToNumber(token: string): number | null {
  if (/^\d+$/.test(token)) return parseInt(token, 10);
  if (token === "元") return 1;

  if (token.includes("十")) {
    const match = token.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);
    if (!match) return null;
    const tens = match[1] ? (KANJI_DIGITS[match[1]] ?? 1) : 1;
    const ones = match[2] ? (KANJI_DIGITS[match[2]] ?? 0) : 0;
    return tens * 10 + ones;
  }

  let value = 0;
  for (const char of token) {
    const digit = KANJI_DIGITS[char];
    if (digit === undefined) return null;
    value = value * 10 + digit;
  }
  return value;
}

// --- Shared building blocks ------------------------------------------------

const NUM = String.raw`\d{1,4}|[〇零一二三四五六七八九十]{1,4}`;

const MONTH_NAMES: Readonly<Record<string, number>> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  sept: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function maybeParseMonthName(monthStr: string): number | null {
  return MONTH_NAMES[monthStr.toLowerCase().replace(/\.$/, "")] ?? null;
}

function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function invalid(rawInput: string, error: string): ParsedInput {
  return { type: "invalid", rawInput, error };
}

/**
 * Builds a western result, enforcing the supported era range. Partial dates
 * (year/month precision) are checked against their representative date the
 * same way the previous implementation did, so 1868 stays accepted as a year.
 */
function buildWestern(rawInput: string, year: number, month?: number, day?: number): ParsedInput {
  const precision: DatePrecision = day !== undefined ? "day" : month !== undefined ? "month" : "year";

  if (month !== undefined && (month < 1 || month > 12)) {
    return invalid(rawInput, ERR.invalidMonth);
  }
  if (day !== undefined && !isValidDate(year, month ?? 1, day)) {
    return invalid(rawInput, ERR.invalidDate);
  }

  if (precision === "year") {
    if (year < 1868) return invalid(rawInput, ERR.preMeiji);
    return { type: "western", westernDate: new Date(year, 0, 1), precision, rawInput };
  }

  const date = new Date(year, (month ?? 1) - 1, day ?? 1);
  if (!maybeFindEraForDate(date)) {
    return invalid(rawInput, ERR.preMeiji);
  }
  return { type: "western", westernDate: date, precision, rawInput };
}

/**
 * Validates an era date and reports boundary problems precisely, e.g.
 * 昭和64年1月8日 fails with "昭和64年は1月7日までです".
 */
function buildJapanese(rawInput: string, era: JapaneseEra, year: number, month?: number, day?: number): ParsedInput {
  if (!isEraYearValid(era, year)) {
    const max = maybeGetEraMaxYear(era);
    const range =
      max === null ? `${era.name}の年は1以上で入力してください。` : `${era.name}は元年から${max}年までです。`;
    return invalid(rawInput, range);
  }
  if (month !== undefined && (month < 1 || month > 12)) {
    return invalid(rawInput, ERR.invalidMonth);
  }

  const westernYear = era.startDate.getFullYear() + year - 1;

  if (month !== undefined && day !== undefined) {
    if (!isValidDate(westernYear, month, day)) return invalid(rawInput, ERR.invalidDate);
    const date = new Date(westernYear, month - 1, day);
    if (date < era.startDate) {
      return invalid(
        rawInput,
        `${era.name}元年は${era.startDate.getMonth() + 1}月${era.startDate.getDate()}日からです。`,
      );
    }
    if (era.endDate && date > era.endDate) {
      return invalid(
        rawInput,
        `${era.name}${year}年は${era.endDate.getMonth() + 1}月${era.endDate.getDate()}日までです。`,
      );
    }
  } else if (month !== undefined) {
    // A month is valid as long as any of its days falls inside the era.
    const monthStart = new Date(westernYear, month - 1, 1);
    const monthEnd = new Date(westernYear, month, 0);
    if (monthEnd < era.startDate || (era.endDate && monthStart > era.endDate)) {
      return invalid(rawInput, `${era.name}${year === 1 ? "元" : year}年に${month}月はありません。`);
    }
  }

  return { type: "japanese", japaneseDate: { era, year, month, day }, rawInput };
}

// --- Matchers --------------------------------------------------------------

interface ParseContext {
  readonly today: Date;
}

type Matcher = (input: string, ctx: ParseContext) => ParsedInput | null;

const RELATIVE_KEYWORDS: Readonly<Record<string, number>> = {
  今日: 0,
  きょう: 0,
  本日: 0,
  today: 0,
  昨日: -1,
  きのう: -1,
  yesterday: -1,
  一昨日: -2,
  おととい: -2,
  明日: 1,
  あした: 1,
  あす: 1,
  tomorrow: 1,
  明後日: 2,
  あさって: 2,
};

const matchRelativeKeyword: Matcher = (input, ctx) => {
  const offset = RELATIVE_KEYWORDS[input.toLowerCase()];
  if (offset === undefined) return null;
  const date = new Date(ctx.today.getFullYear(), ctx.today.getMonth(), ctx.today.getDate() + offset);
  return { type: "western", westernDate: date, precision: "day", rawInput: input };
};

// MMDD compact: 0225 -> Feb 25 of the current year.
// Invalid months fall through so 4-digit years still parse.
const matchShortMMDD: Matcher = (input, ctx) => {
  const match = input.match(/^(\d{2})(\d{2})$/);
  if (!match) return null;
  const month = parseInt(group(match[1]), 10);
  const day = parseInt(group(match[2]), 10);
  if (month < 1 || month > 12) return null;
  if (!isValidDate(ctx.today.getFullYear(), month, day)) return invalid(input, ERR.invalidMonthDay);
  return buildWestern(input, ctx.today.getFullYear(), month, day);
};

// M/D, M-D, M.D and 2月25日 (kanji numerals allowed) -> current year
const matchShortMonthDay: Matcher = (input, ctx) => {
  const match = input.match(new RegExp(`^(${NUM})[./-](${NUM})$`)) ?? input.match(new RegExp(`^(${NUM})月(${NUM})日$`));
  if (!match) return null;
  const month = maybeTokenToNumber(group(match[1]));
  const day = maybeTokenToNumber(group(match[2]));
  if (month === null || day === null) return null;
  if (month < 1 || month > 12) return null;
  if (!isValidDate(ctx.today.getFullYear(), month, day)) return invalid(input, ERR.invalidMonthDay);
  return buildWestern(input, ctx.today.getFullYear(), month, day);
};

// English month + day without a year: "March 8", "Mar 8th" -> current year
const matchShortEnglishMonthDay: Matcher = (input, ctx) => {
  const match = input.match(/^([a-z]+)\.?\s+(\d{1,2})(?:st|nd|rd|th)?$/i);
  if (!match) return null;
  const month = maybeParseMonthName(group(match[1]));
  if (month === null) return null;
  const day = parseInt(group(match[2]), 10);
  if (!isValidDate(ctx.today.getFullYear(), month, day)) return invalid(input, ERR.invalidMonthDay);
  return buildWestern(input, ctx.today.getFullYear(), month, day);
};

// ISO-like: 2024-01-15, 2024/1/15, 2024.1.15. Datetime tails (T10:30, 10:30) are ignored.
const matchWesternFull: Matcher = (input) => {
  const match = input.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})(?:[T\s].*)?$/i);
  if (!match) return null;
  return buildWestern(
    input,
    parseInt(group(match[1]), 10),
    parseInt(group(match[2]), 10),
    parseInt(group(match[3]), 10),
  );
};

// Japanese-style western date: 2024年1月15日, 2024年1月, 2024年 (kanji numerals allowed)
const matchWesternJapaneseStyle: Matcher = (input) => {
  const match = input.match(new RegExp(`^(\\d{4})年(?:\\s*(${NUM})月(?:\\s*(${NUM})日)?)?$`));
  if (!match) return null;
  const year = parseInt(group(match[1]), 10);
  const month = match[2] ? maybeTokenToNumber(match[2]) : undefined;
  const day = match[3] ? maybeTokenToNumber(match[3]) : undefined;
  if (month === null || day === null) return null;
  return buildWestern(input, year, month, day);
};

// Compact: 19970224
const matchWesternCompact: Matcher = (input) => {
  const match = input.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (!match) return null;
  return buildWestern(
    input,
    parseInt(group(match[1]), 10),
    parseInt(group(match[2]), 10),
    parseInt(group(match[3]), 10),
  );
};

// Year-month: 2024-01, 2024/1, 2024.1
const matchWesternYearMonth: Matcher = (input) => {
  const match = input.match(/^(\d{4})[-/.](\d{1,2})$/);
  if (!match) return null;
  return buildWestern(input, parseInt(group(match[1]), 10), parseInt(group(match[2]), 10));
};

// Year only: 2024
const matchWesternYearOnly: Matcher = (input) => {
  const match = input.match(/^(\d{4})$/);
  if (!match) return null;
  return buildWestern(input, parseInt(group(match[1]), 10));
};

// US style: January 15, 2024 / Jan 15th 2024
const matchWesternUS: Matcher = (input) => {
  const match = input.match(/^([a-z]+)\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})$/i);
  if (!match) return null;
  const month = maybeParseMonthName(group(match[1]));
  if (month === null) return null;
  return buildWestern(input, parseInt(group(match[3]), 10), month, parseInt(group(match[2]), 10));
};

// European style: 15 January 2024 / 15th Jan, 2024
const matchWesternEU: Matcher = (input) => {
  const match = input.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+)\.?,?\s+(\d{4})$/i);
  if (!match) return null;
  const month = maybeParseMonthName(group(match[2]));
  if (month === null) return null;
  return buildWestern(input, parseInt(group(match[3]), 10), month, parseInt(group(match[1]), 10));
};

// English month + year: March 2024
const matchWesternMonthYear: Matcher = (input) => {
  const match = input.match(/^([a-z]+)\.?\s+(\d{4})$/i);
  if (!match) return null;
  const month = maybeParseMonthName(group(match[1]));
  if (month === null) return null;
  return buildWestern(input, parseInt(group(match[2]), 10), month);
};

// Unified era date. Covers 令和6年1月15日, 令和元年, 令和六年一月十五日,
// R6, R6.1.15, H31/4/30, S64-1-7, Reiwa 6, reiwa6 ...
// Era years cap at 2 ASCII digits so "R2024" is not read as 令和2024年.
const ERA_YEAR = String.raw`元|\d{1,2}|[〇零一二三四五六七八九十]{1,4}`;
const ERA_PATTERN = new RegExp(
  `^(令和|平成|昭和|大正|明治|reiwa|heisei|showa|taisho|meiji|[RHSTM])[.\\s]*(${ERA_YEAR})(?:年|[./-])?(?:\\s*(${NUM})(?:月|[./-])?(?:\\s*(${NUM})日?)?)?$`,
  "i",
);

const matchEraDate: Matcher = (input) => {
  const match = input.match(ERA_PATTERN);
  if (!match) return null;
  const era = maybeFindEraByName(group(match[1]));
  if (!era) return null;
  const year = maybeTokenToNumber(group(match[2]));
  if (year === null) return null;
  const month = match[3] ? maybeTokenToNumber(match[3]) : undefined;
  const day = match[4] ? maybeTokenToNumber(match[4]) : undefined;
  if (month === null || day === null) return null;
  return buildJapanese(input, era, year, month, day);
};

// Romaji era with an English month: "Reiwa 6, January 15" / "reiwa 6 jan 15"
const matchEraRomajiWithMonth: Matcher = (input) => {
  const match = input.match(/^(reiwa|heisei|showa|taisho|meiji)\s*(\d{1,2})[,\s]+([a-z]+)\.?\s+(\d{1,2})$/i);
  if (!match) return null;
  const era = maybeFindEraByName(group(match[1]));
  if (!era) return null;
  const month = maybeParseMonthName(group(match[3]));
  if (month === null) return null;
  return buildJapanese(input, era, parseInt(group(match[2]), 10), month, parseInt(group(match[4]), 10));
};

// --- Ambiguous inputs ------------------------------------------------------

function maybeEraInterpretation(
  era: JapaneseEra,
  year: number,
  month?: number,
  day?: number,
): NonNullable<ParsedInput["alternativeInterpretations"]>[number] | null {
  if (!isEraYearValid(era, year)) return null;

  const westernYear = era.startDate.getFullYear() + year - 1;
  let date = new Date(westernYear, (month ?? 1) - 1, day ?? 1);

  if (month !== undefined && day !== undefined) {
    if (!isValidDate(westernYear, month, day)) return null;
    if (date < era.startDate || (era.endDate && date > era.endDate)) return null;
  } else if (month !== undefined) {
    const monthEnd = new Date(westernYear, month, 0);
    if (monthEnd < era.startDate || (era.endDate && date > era.endDate)) return null;
    if (date < era.startDate) date = era.startDate;
  } else if (date < era.startDate) {
    // Year-only interpretation: clamp the representative date into the era.
    date = era.startDate;
  }

  const yearLabel = year === 1 ? "元" : String(year);
  const label = `${era.name}${yearLabel}年${month !== undefined ? `${month}月` : ""}${day !== undefined ? `${day}日` : ""}`;
  return { label, western: date, japanese: { era, year, month, day } };
}

// Bare small number ("6") or era-less year-month ("6年1月") -> one candidate per era
const matchAmbiguousEraYear: Matcher = (input) => {
  let year: number | null = null;
  let month: number | undefined;
  let day: number | undefined;

  const bare = input.match(/^(\d{1,2})$/);
  const withMonth = input.match(new RegExp(`^(${NUM})年(${NUM})月(?:(${NUM})日)?$`));

  if (bare) {
    year = parseInt(group(bare[1]), 10);
  } else if (withMonth) {
    year = maybeTokenToNumber(group(withMonth[1]));
    month = maybeTokenToNumber(group(withMonth[2])) ?? undefined;
    day = withMonth[3] ? (maybeTokenToNumber(withMonth[3]) ?? undefined) : undefined;
    if (year === null || month === undefined) return null;
    if (month < 1 || month > 12) return invalid(input, ERR.invalidMonth);
  } else {
    return null;
  }
  if (year === null) return null;

  const interpretations = JAPANESE_ERAS.map((era) => maybeEraInterpretation(era, year, month, day)).filter(
    (alt): alt is NonNullable<typeof alt> => alt !== null,
  );

  if (interpretations.length === 0) return null;
  return { type: "ambiguous", alternativeInterpretations: interpretations, rawInput: input };
};

// --- Entry point -----------------------------------------------------------

const MATCHERS: readonly Matcher[] = [
  matchRelativeKeyword,
  matchShortMMDD,
  matchShortMonthDay,
  matchWesternFull,
  matchWesternJapaneseStyle,
  matchWesternCompact,
  matchWesternYearMonth,
  matchWesternYearOnly,
  matchWesternUS,
  matchWesternEU,
  matchWesternMonthYear,
  matchShortEnglishMonthDay,
  matchEraDate,
  matchEraRomajiWithMonth,
  matchAmbiguousEraYear,
];

export function parseInput(input: string, today: Date = new Date()): ParsedInput {
  const normalized = normalizeInput(input);

  if (!normalized) {
    return { type: "empty", rawInput: input };
  }

  const ctx: ParseContext = { today };
  for (const matcher of MATCHERS) {
    const result = matcher(normalized, ctx);
    if (result) return result;
  }

  return invalid(input, ERR.unparsable);
}
