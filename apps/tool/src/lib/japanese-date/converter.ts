import type { ConversionResult, JapaneseDateParts } from "./types";
import { maybeFindEraForDate, getEraYear } from "./eras";
import { formatJapanese, formatRomaji, formatWestern } from "./formatter";

export function maybeToJapanese(date: Date): ConversionResult["japanese"] | null {
  const era = maybeFindEraForDate(date);
  if (!era) return null;

  const year = getEraYear(date, era);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {
    era,
    year,
    month,
    day,
    formatted: formatJapanese(era, year, month, day),
    formattedRomaji: formatRomaji(era, year, month, day),
  };
}

export function maybeToWestern(japaneseDate: JapaneseDateParts): ConversionResult["western"] | null {
  const { era, year, month, day } = japaneseDate;

  const westernYear = era.startDate.getFullYear() + year - 1;
  const date = new Date(westernYear, (month ?? 1) - 1, day ?? 1);

  // Validate the date falls within the era
  const afterStart = date >= era.startDate;
  const beforeEnd = !era.endDate || date <= era.endDate;

  if (!afterStart || !beforeEnd) {
    return null;
  }

  return {
    date,
    formatted: formatWestern(date, month !== undefined, day !== undefined),
    iso: formatISO(date, month !== undefined, day !== undefined),
  };
}

function formatISO(date: Date, includeMonth: boolean, includeDay: boolean): string {
  const year = date.getFullYear();
  if (!includeMonth) return `${year}`;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  if (!includeDay) return `${year}-${month}`;

  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function maybeConvert(date: Date): ConversionResult | null {
  const japanese = maybeToJapanese(date);
  if (!japanese) return null;

  return {
    western: {
      date,
      formatted: formatWestern(date, true, true),
      iso: formatISO(date, true, true),
    },
    japanese,
  };
}
