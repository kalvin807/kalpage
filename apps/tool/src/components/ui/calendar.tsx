import {
  Calendar as CalendarPrimitive,
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarMonthSelect,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearSelect,
} from '@ui-sdk/react/calendar';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

const NAV_BUTTON =
  'inline-flex size-7 shrink-0 items-center justify-center text-text-muted hover:bg-surface-hover hover:text-text-heading disabled:pointer-events-none disabled:opacity-40';
const SELECT = 'cursor-pointer bg-transparent p-0 text-sm font-medium text-text-heading outline-none';
const WEEKDAY = 'pb-1 text-[0.8rem] font-normal text-text-muted';
const DAY =
  'relative size-7 cursor-pointer p-0 text-center align-middle text-sm tabular-nums hover:bg-surface-hover data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[outside]:text-text-muted/60 data-[today]:font-semibold data-[disabled]:pointer-events-none data-[disabled]:opacity-40';

interface CalendarProps {
  readonly value?: string;
  readonly onValueChange: (value: string) => void;
  readonly defaultMonth?: string;
  readonly className?: string;
}

function Calendar({ value, onValueChange, defaultMonth, className }: CalendarProps) {
  return (
    <CalendarPrimitive
      className={cn('w-fit p-2 text-sm', className)}
      value={value}
      onValueChange={(next) => {
        if (typeof next !== 'string') {
          return;
        }
        onValueChange(next);
      }}
      defaultMonth={defaultMonth}
      // Era conversion starts at Meiji, so the picker starts there too.
      min="1868-10-23"
      max="2100-12-31"
      locale="ja-JP"
      monthFormat="long"
      weekdayFormat="short"
    >
      <div className="mb-2 flex items-center gap-1">
        <CalendarPrevious className={NAV_BUTTON} aria-label="前の月">
          <IconChevronLeft className="size-4" aria-hidden="true" />
        </CalendarPrevious>
        <div className="flex flex-1 items-center justify-center gap-1">
          <CalendarHeading className="sr-only" />
          <CalendarMonthSelect className={SELECT} aria-label="月" />
          <CalendarYearSelect className={SELECT} aria-label="年" />
        </div>
        <CalendarNext className={NAV_BUTTON} aria-label="次の月">
          <IconChevronRight className="size-4" aria-hidden="true" />
        </CalendarNext>
      </div>
      <CalendarGrid className="w-full border-collapse">
        <CalendarWeekdays>{(index) => <CalendarWeekday index={index} className={WEEKDAY} />}</CalendarWeekdays>
        <CalendarWeeks>
          {(cell) =>
            cell.hidden ? (
              <td key={cell.date} />
            ) : (
              <CalendarDay key={cell.date} value={cell.date} className={DAY}>
                {(state) => String(Number(state.date.slice(8)))}
              </CalendarDay>
            )
          }
        </CalendarWeeks>
      </CalendarGrid>
    </CalendarPrimitive>
  );
}

export { Calendar };
