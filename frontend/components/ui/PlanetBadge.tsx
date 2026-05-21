"use client";

import { cn } from "@/lib/utils";

type PlanetBadgeProps = {
  planet: string;
  sign: string;
  element: "fire" | "earth" | "air" | "water";
};

const elementStyles: Record<PlanetBadgeProps["element"], string> = {
  fire: "bg-rose-dust/20 text-rose-dust border-rose-dust/40",
  earth: "bg-emerald-200/10 text-emerald-200 border-emerald-200/30",
  air: "bg-gold/10 text-gold border-gold/40",
  water: "bg-teal-light/20 text-teal-light border-teal-light/40",
};

export function PlanetBadge({ planet, sign, element }: PlanetBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]",
        elementStyles[element],
      )}
    >
      <span aria-hidden="true">{planet}</span>
      <span>{sign}</span>
    </span>
  );
}
