"use client";

import { motion } from "framer-motion";

type CompatibilityGaugeProps = {
  label: string;
  value: number;
};

export function CompatibilityGauge({ label, value }: CompatibilityGaugeProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="90" height="90">
        <circle cx="45" cy="45" r={radius} stroke="#2A2A35" strokeWidth="6" fill="none" />
        <motion.circle
          cx="45"
          cy="45"
          r={radius}
          stroke="#C9A84C"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="text-xs uppercase tracking-[0.2em] text-moonlight/70">{label}</div>
    </div>
  );
}
