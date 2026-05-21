"use client";

import { useState } from "react";
import { SignCarousel } from "@/components/horoscope/SignCarousel";
import { OracleCard } from "@/components/ui/OracleCard";
import { EnergyOrbs } from "@/components/ui/EnergyOrbs";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { useHoroscope } from "@/hooks/useHoroscope";

const periods = ["daily", "weekly", "monthly", "yearly"] as const;

export function HoroscopeClient() {
  const [selectedSign, setSelectedSign] = useState("aries");
  const [period, setPeriod] = useState<(typeof periods)[number]>("daily");
  const { data } = useHoroscope(selectedSign, period);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Horoscope</h1>
        <p className="text-moonlight/70">Choose your sign to unveil today&apos;s cosmic weather.</p>
      </div>
      <SignCarousel selected={selectedSign} onSelect={setSelectedSign} />
      <div className="flex gap-3">
        {periods.map((tab) => (
          <button
            key={tab}
            onClick={() => setPeriod(tab)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] ${
              period === tab ? "border-gold text-gold shadow-gold-glow" : "border-gold/20 text-moonlight/60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <OracleCard>
        <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Your Reading</h2>
        <p className="text-sm text-moonlight/70">
          {data?.summary ??
            "Soft golden light surrounds your choices. Listen to the quiet, confident voice within."}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <EnergyOrbs rating={data?.energy ?? 4} />
          <span className="rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            Lucky {data?.lucky_number ?? 7}
          </span>
          <span className="rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            {data?.lucky_color ?? "Moonlight"}
          </span>
        </div>
      </OracleCard>
      <div className="grid gap-6 md:grid-cols-2">
        <OracleCard>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Related Signs</h3>
          <p className="text-sm text-moonlight/70">
            Harmony with {data?.compatibility_sign ?? "Libra"} flows naturally today.
          </p>
        </OracleCard>
        <OracleCard>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Affirmation</h3>
          <p className="text-sm text-moonlight/70">
            {data?.affirmation ?? "I trust the light guiding my next step."}
          </p>
        </OracleCard>
      </div>
      <OracleCard className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Personal AI Reading</h3>
          <p className="text-sm text-moonlight/70">
            Unlock deeper guidance with a premium, personalized oracle session.
          </p>
        </div>
        <CosmicButton>Unlock</CosmicButton>
      </OracleCard>
    </div>
  );
}
