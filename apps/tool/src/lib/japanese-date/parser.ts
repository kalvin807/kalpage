import type { ParsedInput } from "./types";
import { JAPANESE_ERAS, maybeFindEraByName, maybeFindEraForDate } from "./eras";

// Regex capture groups are guaranteed non-undefined after a successful match
function group(value: string | undefined): string {
  if (value === undefined) throw new Error("unreachable: missing regex capture group");
  return value;
}

function normalizeNumbers(input: string): string {
  return input.replace(/[０-９]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}

// Regex patterns
const PATTERNS = Object.freeze({
  // Western formats
  westernISO: /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/,
  westernCompact: /^(\d{4})(\d{2})(\d{2})$/, // YYYYMMDD format like 19970224
  westernYearMonth: /^(\d{4})[-/](\d{1,2})$/,
  westernYearOnly: /^(\d{4})$/,
  westernUS: /^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/,

  // Short date formats (assumes current year)
  shortMMDD: /^(\d{2})(\d{2})$/, // MMDD format like 0225
  shortMD: /^(\d{1,2})[-/](\d{1,2})$/, // M/D or M-D format like 2/25

  // Japanese era formats
  fullJapanese: /^(令和|平成|昭和|大正|明治)(\d+)年(?:(\d+)月)?(?:(\d+)日)?$/,
  gannenJapanese: /^(令和|平成|昭和|大正|明治)元年(?:(\d+)月)?(?:(\d+)日)?$/,
  abbreviation: /^([RHSTM])(\d+)(?:年)?(?:(\d+)月)?(?:(\d+)日)?$/i,
  romajiWithDate: /^(reiwa|heisei|showa|taisho|meiji)\s*(\d+)(?:[,\s]+(\w+)\s+(\d+))?$/i,
  romajiOnly: /^(reiwa|heisei|showa|taisho|meiji)\s*(\d+)$/i,

  // Japanese month-day format (assumes current year)
  japaneseMonthDay: /^(\d{1,2})月(\d{1,2})日$/,

  // Ambiguous formats
  ambiguousYearOnly: /^(\d{1,2})$/,
  ambiguousWithMonth: /^(\d{1,2})年(\d{1,2})月(?:(\d{1,2})日)?$/,
});

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
  oct: 10,
  nov: 11,
  dec: 12,
};

function maybeParseMonth(monthStr: string): number | null {
  const lower = monthStr.toLowerCase();
  return MONTH_NAMES[lower] ?? null;
}

function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function maybeParseWesternDate(input: string): ParsedInput | null {
  // ISO format: 2024-01-15
  let match = input.match(PATTERNS.westernISO);
  if (match) {
    const year = parseInt(group(match[1]), 10);
    const month = parseInt(group(match[2]), 10);
    const day = parseInt(group(match[3]), 10);

    if (!isValidDate(year, month, day)) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な日付です。正しい日付を入力してください。",
      };
    }

    const date = new Date(year, month - 1, day);
    const era = maybeFindEraForDate(date);

    if (!era) {
      return {
        type: "invalid",
        rawInput: input,
        error: "現時点では、明治以前の日付には対応していません。1868年以降の日付を入力してください。",
      };
    }

    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // Compact format: 19970224 (YYYYMMDD)
  match = input.match(PATTERNS.westernCompact);
  if (match) {
    const year = parseInt(group(match[1]), 10);
    const month = parseInt(group(match[2]), 10);
    const day = parseInt(group(match[3]), 10);

    if (!isValidDate(year, month, day)) {
      return { type: "invalid", rawInput: input, error: "無効な日付です" };
    }

    const date = new Date(year, month - 1, day);
    const era = maybeFindEraForDate(date);

    if (!era) {
      return {
        type: "invalid",
        rawInput: input,
        error: "現時点では、明治以前の日付には対応していません。1868年以降の日付を入力してください。",
      };
    }

    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // Year-month only: 2024-01
  match = input.match(PATTERNS.westernYearMonth);
  if (match) {
    const year = parseInt(group(match[1]), 10);
    const month = parseInt(group(match[2]), 10);

    if (month < 1 || month > 12) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な月です。1から12の間で入力してください。",
      };
    }

    const date = new Date(year, month - 1, 1);
    const era = maybeFindEraForDate(date);

    if (!era) {
      return {
        type: "invalid",
        rawInput: input,
        error: "現時点では、明治以前の日付には対応していません。1868年以降の日付を入力してください。",
      };
    }

    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // Year only: 2024
  match = input.match(PATTERNS.westernYearOnly);
  if (match) {
    const year = parseInt(group(match[1]), 10);

    if (year < 1868) {
      return {
        type: "invalid",
        rawInput: input,
        error: "現時点では、明治以前の年には対応していません。1868年以降を入力してください。",
      };
    }

    const date = new Date(year, 0, 1);
    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // US format: January 15, 2024
  match = input.match(PATTERNS.westernUS);
  if (match) {
    const month = maybeParseMonth(group(match[1]));
    if (month === null) return null;

    const year = parseInt(group(match[3]), 10);
    const day = parseInt(group(match[2]), 10);

    if (!isValidDate(year, month, day)) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な日付です。正しい日付を入力してください。",
      };
    }

    const date = new Date(year, month - 1, day);
    const era = maybeFindEraForDate(date);

    if (!era) {
      return {
        type: "invalid",
        rawInput: input,
        error: "現時点では、明治以前の日付には対応していません。1868年以降の日付を入力してください。",
      };
    }

    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  return null;
}

function maybeParseShortDate(input: string): ParsedInput | null {
  const currentYear = new Date().getFullYear();

  // MMDD format: 0225 -> Feb 25 of current year
  let match = input.match(PATTERNS.shortMMDD);
  if (match) {
    const month = parseInt(group(match[1]), 10);
    const day = parseInt(group(match[2]), 10);

    if (month < 1 || month > 12) return null;

    if (!isValidDate(currentYear, month, day)) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な日付です。正しい月日を入力してください。",
      };
    }

    const date = new Date(currentYear, month - 1, day);
    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // M/D or M-D format: 2/25 -> Feb 25 of current year
  match = input.match(PATTERNS.shortMD);
  if (match) {
    const month = parseInt(group(match[1]), 10);
    const day = parseInt(group(match[2]), 10);

    if (!isValidDate(currentYear, month, day)) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な日付です。正しい月日を入力してください。",
      };
    }

    const date = new Date(currentYear, month - 1, day);
    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  // Japanese month-day: 2月25日 -> Feb 25 of current year
  match = input.match(PATTERNS.japaneseMonthDay);
  if (match) {
    const month = parseInt(group(match[1]), 10);
    const day = parseInt(group(match[2]), 10);

    if (!isValidDate(currentYear, month, day)) {
      return {
        type: "invalid",
        rawInput: input,
        error: "無効な日付です。正しい月日を入力してください。",
      };
    }

    const date = new Date(currentYear, month - 1, day);
    return {
      type: "western",
      westernDate: date,
      rawInput: input,
    };
  }

  return null;
}

function maybeParseJapaneseDate(input: string): ParsedInput | null {
  // Full Japanese: 令和6年1月15日
  let match = input.match(PATTERNS.fullJapanese);
  if (match) {
    const era = maybeFindEraByName(group(match[1]));
    if (!era) return null;

    const year = parseInt(group(match[2]), 10);
    const month = match[3] ? parseInt(match[3], 10) : undefined;
    const day = match[4] ? parseInt(match[4], 10) : undefined;

    return {
      type: "japanese",
      japaneseDate: { era, year, month, day },
      rawInput: input,
    };
  }

  // Gannen (元年) format: 令和元年
  match = input.match(PATTERNS.gannenJapanese);
  if (match) {
    const era = maybeFindEraByName(group(match[1]));
    if (!era) return null;

    const month = match[2] ? parseInt(match[2], 10) : undefined;
    const day = match[3] ? parseInt(match[3], 10) : undefined;

    return {
      type: "japanese",
      japaneseDate: { era, year: 1, month, day },
      rawInput: input,
    };
  }

  // Abbreviation: R6, H31
  match = input.match(PATTERNS.abbreviation);
  if (match) {
    const era = maybeFindEraByName(group(match[1]));
    if (!era) return null;

    const year = parseInt(group(match[2]), 10);
    const month = match[3] ? parseInt(match[3], 10) : undefined;
    const day = match[4] ? parseInt(match[4], 10) : undefined;

    return {
      type: "japanese",
      japaneseDate: { era, year, month, day },
      rawInput: input,
    };
  }

  // Romaji: Reiwa 6, heisei31
  match = input.match(PATTERNS.romajiOnly);
  if (match) {
    const era = maybeFindEraByName(group(match[1]));
    if (!era) return null;

    const year = parseInt(group(match[2]), 10);

    return {
      type: "japanese",
      japaneseDate: { era, year },
      rawInput: input,
    };
  }

  // Romaji with date: Reiwa 6, January 15
  match = input.match(PATTERNS.romajiWithDate);
  if (match) {
    const era = maybeFindEraByName(group(match[1]));
    if (!era) return null;

    const year = parseInt(group(match[2]), 10);
    const month = match[3] ? (maybeParseMonth(match[3]) ?? undefined) : undefined;
    const day = match[4] ? parseInt(match[4], 10) : undefined;

    return {
      type: "japanese",
      japaneseDate: { era, year, month, day },
      rawInput: input,
    };
  }

  return null;
}

function maybeParseAmbiguous(input: string): ParsedInput | null {
  // Just a number: could be era year
  let match = input.match(PATTERNS.ambiguousYearOnly);
  if (match) {
    const num = parseInt(group(match[1]), 10);

    // Generate interpretations for each era where this year is valid
    const interpretations: ParsedInput["alternativeInterpretations"] = [];

    for (const era of JAPANESE_ERAS) {
      const westernYear = era.startDate.getFullYear() + num - 1;
      const date = new Date(westernYear, 0, 1);

      // Check if this date falls within the era
      const afterStart = date >= era.startDate;
      const beforeEnd = !era.endDate || date <= era.endDate;

      if (afterStart && beforeEnd) {
        interpretations.push({
          label: `${era.name}${num}年`,
          western: date,
          japanese: { era, year: num },
        });
      }
    }

    if (interpretations.length > 0) {
      return {
        type: "ambiguous",
        alternativeInterpretations: interpretations,
        rawInput: input,
      };
    }
  }

  // Year with month: 6年1月
  match = input.match(PATTERNS.ambiguousWithMonth);
  if (match) {
    const year = parseInt(group(match[1]), 10);
    const month = parseInt(group(match[2]), 10);
    const day = match[3] ? parseInt(match[3], 10) : undefined;

    const interpretations: ParsedInput["alternativeInterpretations"] = [];

    for (const era of JAPANESE_ERAS) {
      const westernYear = era.startDate.getFullYear() + year - 1;
      const date = new Date(westernYear, month - 1, day ?? 1);

      const afterStart = date >= era.startDate;
      const beforeEnd = !era.endDate || date <= era.endDate;

      if (afterStart && beforeEnd) {
        interpretations.push({
          label: `${era.name}${year}年${month}月${day ? day + "日" : ""}`,
          western: date,
          japanese: { era, year, month, day },
        });
      }
    }

    if (interpretations.length > 0) {
      return {
        type: "ambiguous",
        alternativeInterpretations: interpretations,
        rawInput: input,
      };
    }
  }

  return null;
}

export function parseInput(input: string): ParsedInput {
  const trimmed = normalizeNumbers(input.trim());

  if (!trimmed) {
    return { type: "empty", rawInput: input };
  }

  // Try short date patterns (M/D, MMDD, 月日) - assumes current year
  // Check these first so "0225" isn't matched as year 0225
  const shortResult = maybeParseShortDate(trimmed);
  if (shortResult) return shortResult;

  // Try Western date patterns
  const westernResult = maybeParseWesternDate(trimmed);
  if (westernResult) return westernResult;

  // Try Japanese era patterns
  const japaneseResult = maybeParseJapaneseDate(trimmed);
  if (japaneseResult) return japaneseResult;

  // Check for ambiguous patterns
  const ambiguousResult = maybeParseAmbiguous(trimmed);
  if (ambiguousResult) return ambiguousResult;

  // Invalid input
  return {
    type: "invalid",
    rawInput: input,
    error: "入力を日付として解釈できませんでした。形式を確認してください。",
  };
}
