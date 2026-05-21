"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BirthChartWheel } from "@/components/birth-chart/BirthChartWheel";
import { OracleCard } from "@/components/ui/OracleCard";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { PlanetBadge } from "@/components/ui/PlanetBadge";
import { useBirthChart, useBirthChartGenerate } from "@/hooks/useBirthChart";

const formSchema = z.object({
  birth_date: z.string().min(1, "Birth date is required"),
  birth_time: z.string().optional(),
  birth_city: z.string().min(2, "City is required"),
  birth_country: z.string().min(2, "Country is required"),
});

type FormValues = z.infer<typeof formSchema>;

const fallbackPlanets = [
  { name: "Sun", sign: "Leo", house: 5 },
  { name: "Moon", sign: "Pisces", house: 1 },
  { name: "Mercury", sign: "Virgo", house: 4 },
  { name: "Venus", sign: "Libra", house: 6 },
  { name: "Mars", sign: "Aries", house: 9 },
];

export function BirthChartClient() {
  const { data } = useBirthChart();
  const chart = data ?? {
    summary: "A luminous blend of fire and water, devoted to artistry and intuition.",
    dominant_element: "fire",
    planets: fallbackPlanets,
    aspects: [],
  };
  const [activePlanet, setActivePlanet] = useState(chart.planets[0]?.name);
  const selected = useMemo(
    () => chart.planets.find((planet) => planet.name === activePlanet),
    [chart.planets, activePlanet],
  );
  const generateChart = useBirthChartGenerate();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    generateChart.mutate(values);
  };

  if (!data) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Create Your Birth Chart</h1>
        <OracleCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Date
              <input
                type="date"
                {...register("birth_date")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Time
              <input
                type="time"
                {...register("birth_time")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Birth City
              <input
                type="text"
                {...register("birth_city")}
                placeholder="Enter city"
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Country
              <input
                type="text"
                {...register("birth_country")}
                placeholder="Enter country"
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            {formState.errors.birth_date ? (
              <p className="text-xs text-rose-dust">{formState.errors.birth_date.message}</p>
            ) : null}
            <CosmicButton type="submit" className="w-full">
              Generate Chart
            </CosmicButton>
          </form>
        </OracleCard>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="flex items-center justify-center rounded-3xl border border-gold/20 bg-obsidian-light/40 p-6">
        <BirthChartWheel
          planets={chart.planets}
          activePlanet={activePlanet}
          onSelect={(planet) => setActivePlanet(planet.name)}
        />
      </div>
      <div className="space-y-6">
        <OracleCard>
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Interpretation</h2>
          <p className="text-sm text-moonlight/70">{chart.summary}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {chart.planets.map((planet) => (
              <PlanetBadge
                key={planet.name}
                planet={planet.name}
                sign={planet.sign}
                element={planet.name === "Mars" ? "fire" : "air"}
              />
            ))}
          </div>
        </OracleCard>
        <OracleCard>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Selected Planet</h3>
          <p className="text-sm text-moonlight/70">
            {selected?.name} in {selected?.sign}, House {selected?.house}
          </p>
        </OracleCard>
      </div>
    </div>
  );
}
