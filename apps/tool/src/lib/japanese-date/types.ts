export interface JapaneseEra {
  name: string; // "令和"
  nameRomaji: string; // "Reiwa"
  abbreviation: string; // "R"
  startDate: Date;
  endDate?: Date; // undefined for current era
}

export interface JapaneseDateParts {
  era: JapaneseEra;
  year: number;
  month?: number;
  day?: number;
}

export interface ParsedInput {
  type: "western" | "japanese" | "ambiguous" | "invalid" | "empty";
  westernDate?: Date;
  japaneseDate?: JapaneseDateParts;
  alternativeInterpretations?: Array<{
    label: string;
    western?: Date;
    japanese?: JapaneseDateParts;
  }>;
  rawInput: string;
  error?: string;
}

export interface ConversionResult {
  western: {
    date: Date;
    formatted: string; // "January 15, 2024"
    iso: string; // "2024-01-15"
  };
  japanese: {
    era: JapaneseEra;
    year: number;
    month?: number;
    day?: number;
    formatted: string; // "令和6年1月15日"
    formattedRomaji: string; // "Reiwa 6, January 15"
  };
}
