"use client";

import { addDays, endOfMonth, format, startOfMonth } from "date-fns";
import { MoonSVG } from "@/components/ui/MoonSVG";

type MoonCalendarDay = {
  date: string;
  phase: number;
  name: string;
};

type MoonCalendarProps = {
  year: number;
  month: number;
  phases?: MoonCalendarDay[];
};

export function MoonCalendar({ year, month, phases = [] }: MoonCalendarProps) {
  const start = startOfMonth(new Date(year, month - 1, 1));
  const end = endOfMonth(start);
  const days: Date[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day);
  }
  const phaseMap = new Map(phases.map((phase) => [phase.date, phase]));

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day) => {
        const iso = format(day, "yyyy-MM-dd");
        const phase = phaseMap.get(iso);
        return (
          <div key={iso} className="flex flex-col items-center gap-2 rounded-2xl border border-gold/20 p-3">
            <MoonSVG phase={phase?.phase ?? 0.5} size={48} />
            <div className="text-xs uppercase tracking-[0.2em] text-moonlight/70">
              {format(day, "dd")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
