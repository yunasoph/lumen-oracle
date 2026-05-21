"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Planet = {
  name: string;
  sign: string;
  house: number;
};

type BirthChartWheelProps = {
  planets: Planet[];
  activePlanet?: string;
  onSelect?: (planet: Planet) => void;
};

export function BirthChartWheel({ planets, activePlanet, onSelect }: BirthChartWheelProps) {
  const houseAngles = useMemo(() => Array.from({ length: 12 }, (_, i) => i * 30), []);

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full max-w-[420px] text-gold">
      <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
      {houseAngles.map((angle) => {
        const radians = (angle - 90) * (Math.PI / 180);
        const x = 200 + Math.cos(radians) * 180;
        const y = 200 + Math.sin(radians) * 180;
        return <line key={angle} x1="200" y1="200" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" />;
      })}
      {planets.map((planet, index) => {
        const angle = (index / planets.length) * 360 - 90;
        const radians = angle * (Math.PI / 180);
        const x = 200 + Math.cos(radians) * 140;
        const y = 200 + Math.sin(radians) * 140;
        const isActive = activePlanet === planet.name;
        return (
          <g key={planet.name} onClick={() => onSelect?.(planet)} className="cursor-pointer">
            <circle
              cx={x}
              cy={y}
              r={isActive ? 10 : 8}
              className={cn(isActive ? "fill-gold" : "fill-transparent", "stroke-gold")}
              strokeWidth="1"
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill={isActive ? "#0A0A0F" : "#C9A84C"}>
              {planet.name.slice(0, 2).toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx="200" cy="200" r="4" fill="#C9A84C" />
    </svg>
  );
}
