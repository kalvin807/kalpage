import { useState, useMemo, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { IconCopy, IconCheck, IconCalendar, IconArrowLeft } from "@tabler/icons-react";
import * as holiday_jp from "@holiday-jp/holiday_jp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  parseInput,
  maybeToJapanese,
  maybeToWestern,
  JAPANESE_ERAS,
  type ParsedInput,
  type ConversionResult,
} from "@/lib/japanese-date";

interface HolidayInfo {
  readonly name: string;
  readonly nameEn: string;
}

interface ZodiacInfo {
  readonly animal: string;
  readonly animalEn: string;
  readonly emoji: string;
}

interface StarSignInfo {
  readonly name: string;
  readonly nameEn: string;
  readonly emoji: string;
}

const CHINESE_ZODIAC = [
  { name: "子（ねずみ）", nameEn: "Rat", emoji: "🐀" },
  { name: "丑（うし）", nameEn: "Ox", emoji: "🐂" },
  { name: "寅（とら）", nameEn: "Tiger", emoji: "🐅" },
  { name: "卯（うさぎ）", nameEn: "Rabbit", emoji: "🐇" },
  { name: "辰（たつ）", nameEn: "Dragon", emoji: "🐉" },
  { name: "巳（へび）", nameEn: "Snake", emoji: "🐍" },
  { name: "午（うま）", nameEn: "Horse", emoji: "🐎" },
  { name: "未（ひつじ）", nameEn: "Goat", emoji: "🐐" },
  { name: "申（さる）", nameEn: "Monkey", emoji: "🐒" },
  { name: "酉（とり）", nameEn: "Rooster", emoji: "🐓" },
  { name: "戌（いぬ）", nameEn: "Dog", emoji: "🐕" },
  { name: "亥（いのしし）", nameEn: "Boar", emoji: "🐗" },
] as const;

const STAR_SIGNS = [
  { name: "山羊座", nameEn: "Capricorn", emoji: "♑", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: "水瓶座", nameEn: "Aquarius", emoji: "♒", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "魚座", nameEn: "Pisces", emoji: "♓", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "牡羊座", nameEn: "Aries", emoji: "♈", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "牡牛座", nameEn: "Taurus", emoji: "♉", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "双子座", nameEn: "Gemini", emoji: "♊", startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: "蟹座", nameEn: "Cancer", emoji: "♋", startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: "獅子座", nameEn: "Leo", emoji: "♌", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "乙女座", nameEn: "Virgo", emoji: "♍", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "天秤座", nameEn: "Libra", emoji: "♎", startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: "蠍座", nameEn: "Scorpio", emoji: "♏", startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: "射手座", nameEn: "Sagittarius", emoji: "♐", startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
] as const;

function getChineseZodiac(year: number): ZodiacInfo {
  const index = (year - 4) % 12;
  const zodiac = CHINESE_ZODIAC[index];
  if (!zodiac) throw new Error(`unreachable: invalid zodiac index ${index}`);
  return { animal: zodiac.name, animalEn: zodiac.nameEn, emoji: zodiac.emoji };
}

function getStarSign(month: number, day: number): StarSignInfo {
  for (const sign of STAR_SIGNS) {
    if (sign.startMonth === 12) {
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return { name: sign.name, nameEn: sign.nameEn, emoji: sign.emoji };
      }
    } else {
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) {
        return { name: sign.name, nameEn: sign.nameEn, emoji: sign.emoji };
      }
    }
  }
  throw new Error(`unreachable: no star sign matched for month=${month} day=${day}`);
}

function maybeGetHoliday(date: Date): HolidayInfo | undefined {
  const holidays = holiday_jp.between(date, date);
  const first = holidays[0];
  if (first) {
    return { name: first.name, nameEn: first.name_en };
  }
  return undefined;
}

export const Route = createFileRoute("/tool/date")({
  component: DateConverterPage,
  head: () => ({
    meta: [
      { title: "和暦・西暦変換" },
      {
        name: "description",
        content: "西暦と和暦（令和・平成・昭和・大正・明治）を相互変換するツール",
      },
      { property: "og:url", content: `${SITE_URL}/tool/date` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/tool/date` }],
  }),
});

function getTodayISO(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DateConverterPage() {
  const [input, setInput] = useState(getTodayISO);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => {
    const parsed = parseInput(input);
    return processResult(parsed);
  }, [input]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-dvh">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <IconArrowLeft className="size-3.5" />
            <span>Tools</span>
          </Link>
        </nav>

        {/* Title */}
        <header className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">和暦・西暦変換</h1>
          <p className="mt-1 text-sm text-muted-foreground">Western and Japanese era date conversion</p>
        </header>

        {/* Input */}
        <div className="mb-8">
          <div
            className={`relative flex items-center rounded-lg border bg-card shadow-sm transition-all ${isFocused ? "border-primary/60 ring-2 ring-ring" : "border-border hover:border-foreground/20"
              }`}
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="2024-01-15, 令和6年, R6..."
              className="h-12 flex-1 border-0 bg-transparent px-4 text-base font-mono font-medium tracking-wide placeholder:font-sans placeholder:font-normal placeholder:text-muted-foreground/60 focus-visible:ring-0 sm:h-14 sm:text-lg"
              aria-label="日付入力"
            />
            <Popover>
              <PopoverTrigger
                className="mr-2 flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="カレンダーから選択"
              >
                <IconCalendar className="size-4.5" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-auto p-0">
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={result.conversion?.western.date}
                  onSelect={(date) => {
                    if (date) {
                      const year = date.getFullYear();
                      const month = String(date.getMonth() + 1).padStart(2, "0");
                      const day = String(date.getDate()).padStart(2, "0");
                      setInput(`${year}-${month}-${day}`);
                    }
                  }}
                  defaultMonth={result.conversion?.western.date ?? new Date()}
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">YYYY-MM-DD, 令和6年, R6, 19970224, etc.</p>
        </div>

        {/* Results */}
        <ResultsSection result={result} />

        {/* Era Reference */}
        <EraReferenceSection />
      </div>
    </div>
  );
}

// --- Data processing (unchanged logic) ---

interface DateExtras {
  readonly holiday?: HolidayInfo;
  readonly zodiac: ZodiacInfo;
  readonly starSign: StarSignInfo;
}

interface ProcessedResult {
  type: ParsedInput["type"];
  conversion?: ConversionResult;
  extras?: DateExtras;
  alternatives?: Array<{
    label: string;
    conversion: ConversionResult;
    extras?: DateExtras;
  }>;
  error?: string;
}

function getDateExtras(date: Date): DateExtras {
  return {
    holiday: maybeGetHoliday(date),
    zodiac: getChineseZodiac(date.getFullYear()),
    starSign: getStarSign(date.getMonth() + 1, date.getDate()),
  };
}

function processResult(parsed: ParsedInput): ProcessedResult {
  if (parsed.type === "empty") return { type: "empty" };
  if (parsed.type === "invalid") return { type: "invalid", error: parsed.error };

  if (parsed.type === "western" && parsed.westernDate) {
    const japanese = maybeToJapanese(parsed.westernDate);
    if (!japanese) return { type: "invalid", error: "明治以前の日付は対応していません" };
    return {
      type: "western",
      conversion: {
        western: {
          date: parsed.westernDate,
          formatted: formatWesternDate(parsed.westernDate),
          iso: formatISO(parsed.westernDate),
        },
        japanese,
      },
      extras: getDateExtras(parsed.westernDate),
    };
  }

  if (parsed.type === "japanese" && parsed.japaneseDate) {
    const western = maybeToWestern(parsed.japaneseDate);
    if (!western) return { type: "invalid", error: "無効な年号と年の組み合わせです" };
    const japanese = maybeToJapanese(western.date);
    if (!japanese) return { type: "invalid", error: "変換エラー" };
    return {
      type: "japanese",
      conversion: { western, japanese },
      extras: getDateExtras(western.date),
    };
  }

  if (parsed.type === "ambiguous" && parsed.alternativeInterpretations) {
    const alternatives = parsed.alternativeInterpretations
      .map((alt) => {
        if (!alt.western || !alt.japanese) return null;
        const japanese = maybeToJapanese(alt.western);
        if (!japanese) return null;
        return {
          label: alt.label,
          conversion: {
            western: {
              date: alt.western,
              formatted: formatWesternDate(alt.western),
              iso: formatISO(alt.western),
            },
            japanese,
          },
          extras: getDateExtras(alt.western),
        };
      })
      .filter((alt): alt is NonNullable<typeof alt> => alt !== null);
    return { type: "ambiguous", alternatives };
  }

  return { type: "invalid", error: "不明なエラー" };
}

function formatWesternDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// --- UI Components ---

interface CopyButtonProps {
  readonly text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard write failed:", e);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon-xs"
      onClick={handleCopy}
      aria-label="コピー"
      className="size-6 text-muted-foreground/50 transition-all hover:text-foreground active:scale-95"
    >
      {copied ? <IconCheck className="size-3 text-emerald-600" /> : <IconCopy className="size-3" />}
    </Button>
  );
}

interface ResultsSectionProps {
  readonly result: ProcessedResult;
}

function ResultsSection({ result }: ResultsSectionProps) {
  if (result.type === "empty") {
    return <EmptyState />;
  }
  if (result.type === "invalid") {
    return <ErrorState message={result.error ?? "無効な入力"} />;
  }
  if (result.type === "ambiguous" && result.alternatives) {
    return <AmbiguousResults alternatives={result.alternatives} />;
  }
  if (result.conversion) {
    return <ConversionCards conversion={result.conversion} extras={result.extras} />;
  }
  return null;
}

function EmptyState() {
  return (
    <div className="animate-in fade-in-0 py-6 text-center text-sm text-muted-foreground duration-200">
      変換する日付を入力してください
    </div>
  );
}

interface ErrorStateProps {
  readonly message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="animate-in fade-in-0 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive duration-150">
      {message}
    </div>
  );
}

interface DataRowProps {
  readonly label: string;
  readonly value: string;
  readonly sub?: string;
  readonly mono?: boolean;
  readonly delay?: number;
}

function DataRow({ label, value, sub, mono = false, delay = 0 }: DataRowProps) {
  return (
    <div
      className="animate-in fade-in-0 slide-in-from-bottom-1 flex items-baseline justify-between gap-4 border-b border-border/60 py-3 last:border-0 duration-200"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <span className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 text-right">
        <span className={`text-sm font-medium ${mono ? "font-mono tabular-nums" : ""}`}>{value}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
        <CopyButton text={value} />
      </span>
    </div>
  );
}

interface ConversionCardsProps {
  readonly conversion: ConversionResult;
  readonly extras?: DateExtras;
}

function ConversionCards({ conversion, extras }: ConversionCardsProps) {
  const hasHoliday = !!extras?.holiday;
  const baseDelay = hasHoliday ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Holiday */}
      {extras?.holiday && (
        <div
          className="animate-in fade-in-0 slide-in-from-bottom-1 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 duration-200"
          style={{ animationDelay: "0ms", animationFillMode: "both" }}
        >
          <span className="text-base">🎌</span>
          <div className="flex-1">
            <span className="text-sm font-medium text-red-900">{extras.holiday.name}</span>
            <span className="ml-2 text-xs text-red-700/70">{extras.holiday.nameEn}</span>
          </div>
          <CopyButton text={extras.holiday.name} />
        </div>
      )}

      {/* Main conversion table */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <DataRow label="西暦" value={conversion.western.formatted} delay={(baseDelay + 0) * 40} mono />
        <DataRow label="ISO" value={conversion.western.iso} delay={(baseDelay + 1) * 40} mono />
        <DataRow label="和暦" value={conversion.japanese.formatted} delay={(baseDelay + 2) * 40} />
        <DataRow label="Romaji" value={conversion.japanese.formattedRomaji} delay={(baseDelay + 3) * 40} mono />
        <DataRow
          label="元号"
          value={`${conversion.japanese.era.name} (${conversion.japanese.era.abbreviation})`}
          sub={conversion.japanese.era.nameRomaji}
          delay={(baseDelay + 4) * 40}
        />
      </div>

      {/* Zodiac — compact row */}
      {extras && (
        <div
          className="animate-in fade-in-0 slide-in-from-bottom-1 flex items-center gap-6 rounded-lg border border-border bg-card px-4 py-3 shadow-sm duration-200"
          style={{ animationDelay: `${(baseDelay + 5) * 40}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{extras.zodiac.emoji}</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">干支</p>
              <p className="text-sm font-medium">{extras.zodiac.animal}</p>
            </div>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-base">{extras.starSign.emoji}</span>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">星座</p>
              <p className="text-sm font-medium">{extras.starSign.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface AmbiguousResultsProps {
  readonly alternatives: ReadonlyArray<{
    readonly label: string;
    readonly conversion: ConversionResult;
    readonly extras?: DateExtras;
  }>;
}

function AmbiguousResults({ alternatives }: AmbiguousResultsProps) {
  return (
    <div className="space-y-4">
      <div className="animate-in fade-in-0 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm duration-150">
        <span className="font-medium text-amber-900">複数の解釈があります</span>
        <span className="ml-1 text-amber-700/80"> — 入力された値は複数の日付として解釈できます</span>
      </div>

      {alternatives.map((alt, index) => (
        <div
          key={index}
          className="animate-in fade-in-0 slide-in-from-bottom-1 rounded-lg border border-border bg-card shadow-sm duration-200"
          style={{ animationDelay: `${(index + 1) * 50}ms`, animationFillMode: "both" }}
        >
          <div className="border-b border-border/60 px-4 py-2.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{alt.label}</span>
            {alt.extras?.holiday && <span className="ml-2 text-xs text-red-600">🎌 {alt.extras.holiday.name}</span>}
          </div>
          <div className="grid gap-x-8 gap-y-0 px-4 sm:grid-cols-2">
            <DataRow label="西暦" value={alt.conversion.western.formatted} mono />
            <DataRow label="和暦" value={alt.conversion.japanese.formatted} />
          </div>
          {alt.extras && (
            <div className="flex gap-4 border-t border-border/60 px-4 py-2.5 text-xs text-muted-foreground">
              <span>
                {alt.extras.zodiac.emoji} {alt.extras.zodiac.animal}
              </span>
              <span>
                {alt.extras.starSign.emoji} {alt.extras.starSign.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EraReferenceSection() {
  return (
    <div className="mt-10 border-t border-border pt-8">
      <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">年号一覧</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3">
        {JAPANESE_ERAS.map((era, i) => (
          <div
            key={era.name}
            className="animate-in fade-in-0 flex items-baseline gap-2.5 border-b border-border/40 py-2.5 duration-200"
            style={{ animationDelay: `${i * 25}ms`, animationFillMode: "both" }}
          >
            <span className="font-mono text-xs font-medium text-primary">{era.abbreviation}</span>
            <span className="text-sm font-medium">{era.name}</span>
            <span className="text-xs text-muted-foreground">{era.nameRomaji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
