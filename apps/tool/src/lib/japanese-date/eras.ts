import type { JapaneseEra } from "./types";

export const JAPANESE_ERAS: JapaneseEra[] = [
  {
    name: "令和",
    nameRomaji: "Reiwa",
    abbreviation: "R",
    startDate: new Date(2019, 4, 1), // May 1, 2019
  },
  {
    name: "平成",
    nameRomaji: "Heisei",
    abbreviation: "H",
    startDate: new Date(1989, 0, 8), // Jan 8, 1989
    endDate: new Date(2019, 3, 30), // April 30, 2019
  },
  {
    name: "昭和",
    nameRomaji: "Showa",
    abbreviation: "S",
    startDate: new Date(1926, 11, 25), // Dec 25, 1926
    endDate: new Date(1989, 0, 7), // Jan 7, 1989
  },
  {
    name: "大正",
    nameRomaji: "Taisho",
    abbreviation: "T",
    startDate: new Date(1912, 6, 30), // July 30, 1912
    endDate: new Date(1926, 11, 24), // Dec 24, 1926
  },
  {
    name: "明治",
    nameRomaji: "Meiji",
    abbreviation: "M",
    startDate: new Date(1868, 9, 23), // Oct 23, 1868
    endDate: new Date(1912, 6, 29), // July 29, 1912
  },
];

export function maybeFindEraForDate(date: Date): JapaneseEra | null {
  for (const era of JAPANESE_ERAS) {
    const afterStart = date >= era.startDate;
    const beforeEnd = !era.endDate || date <= era.endDate;
    if (afterStart && beforeEnd) {
      return era;
    }
  }
  return null;
}

export function maybeFindEraByName(input: string): JapaneseEra | null {
  const normalized = input.toLowerCase().trim();

  for (const era of JAPANESE_ERAS) {
    if (
      normalized === era.name ||
      normalized === era.nameRomaji.toLowerCase() ||
      normalized === era.abbreviation.toLowerCase()
    ) {
      return era;
    }
  }
  return null;
}

export function getEraYear(date: Date, era: JapaneseEra): number {
  return date.getFullYear() - era.startDate.getFullYear() + 1;
}

/** Last era year (e.g. 31 for 平成, 64 for 昭和). Null for the ongoing era. */
export function maybeGetEraMaxYear(era: JapaneseEra): number | null {
  if (!era.endDate) return null;
  return era.endDate.getFullYear() - era.startDate.getFullYear() + 1;
}

/**
 * Era years are calendar-year based (平成元年 = 1989 even though the era starts
 * Jan 8), so validity must be checked on the year number, not a Jan 1 date.
 */
export function isEraYearValid(era: JapaneseEra, year: number): boolean {
  if (year < 1) return false;
  const max = maybeGetEraMaxYear(era);
  return max === null || year <= max;
}
