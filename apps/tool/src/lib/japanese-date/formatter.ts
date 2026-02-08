import type { JapaneseEra } from "./types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatJapanese(era: JapaneseEra, year: number, month?: number, day?: number): string {
  // Use 元年 (gannen) for year 1
  const yearStr = year === 1 ? "元" : String(year);
  let result = `${era.name}${yearStr}年`;

  if (month !== undefined) {
    result += `${month}月`;
  }
  if (day !== undefined) {
    result += `${day}日`;
  }

  return result;
}

export function formatRomaji(era: JapaneseEra, year: number, month?: number, day?: number): string {
  let result = `${era.nameRomaji} ${year}`;

  if (month !== undefined && day !== undefined) {
    result += `, ${MONTH_NAMES[month - 1]} ${day}`;
  } else if (month !== undefined) {
    result += `, ${MONTH_NAMES[month - 1]}`;
  }

  return result;
}

export function formatWestern(date: Date, includeMonth: boolean = true, includeDay: boolean = true): string {
  if (!includeMonth) {
    return String(date.getFullYear());
  }

  if (!includeDay) {
    return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }

  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
