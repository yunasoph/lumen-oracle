"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { MoonCalendar } from "@/components/moon/MoonCalendar";
import { MoonSVG } from "@/components/ui/MoonSVG";
import { OracleCard } from "@/components/ui/OracleCard";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { useMoonCalendar, useMoonPhase } from "@/hooks/useMoonPhase";

export function MoonClient() {
  const today = useMemo(() => new Date(), []);
  const { data: current } = useMoonPhase();
  const { data: calendar } = useMoonCalendar(today.getFullYear(), today.getMonth() + 1);
  const phase = current?.phase ?? 0.5;
  const phaseName = current?.name ?? "Waxing Crescent";
  const nextPhase = current?.next_phase ?? "Full Moon";
  const countdown = current?.next_phase_in_days ?? 5;

  const monthLabel = useMemo(() => format(today, "MMMM yyyy"), [today]);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Moon Phase</h1>
        <p className="text-moonlight/70">Follow the lunar pulse and align your rituals.</p>
      </div>
      <OracleCard>
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
          <MoonSVG phase={phase} size={160} glowing />
          <div className="space-y-2">
            <div className="text-2xl font-display text-moonlight">{phaseName}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold">
              In {current?.sign ?? "Cancer"}
            </div>
            <div className="text-sm text-moonlight/70">
              Next phase: {nextPhase} · {countdown} days
            </div>
          </div>
        </div>
      </OracleCard>
      <OracleCard>
        <div className="flex items-center justify-between">
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Moon Calendar</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-moonlight/60">
            {monthLabel}
          </span>
        </div>
        <div className="mt-6">
          <MoonCalendar year={today.getFullYear()} month={today.getMonth() + 1} phases={calendar} />
        </div>
      </OracleCard>
      <OracleCard className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Ritual Suggestion</h3>
          <p className="text-sm text-moonlight/70">
            Cleanse your altar with salt water and write down what you&apos;re ready to release.
          </p>
        </div>
        <CosmicButton variant="secondary">Moon Journal</CosmicButton>
      </OracleCard>
    </div>
  );
}
