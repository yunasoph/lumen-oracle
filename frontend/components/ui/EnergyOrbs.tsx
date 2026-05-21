"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type EnergyOrbsProps = {
  rating: number;
};

export function EnergyOrbs({ rating }: EnergyOrbsProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Energy rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;
        return (
          <motion.span
            key={index}
            className={cn(
              "h-3 w-3 rounded-full border border-gold/40",
              filled ? "bg-gold" : "bg-transparent",
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          />
        );
      })}
    </div>
  );
}
