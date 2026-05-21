"use client";

import { motion } from "framer-motion";
import { zodiacByKey } from "@/lib/zodiac";
import { cn } from "@/lib/utils";

type ZodiacGlyphProps = {
  sign: string;
  size?: number;
  glowing?: boolean;
  animated?: boolean;
  className?: string;
};

export function ZodiacGlyph({
  sign,
  size = 48,
  glowing = false,
  animated = false,
  className,
}: ZodiacGlyphProps) {
  const data = zodiacByKey[sign];
  const glyph = data?.glyph ?? "✶";
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-label={`${data?.name ?? sign} zodiac glyph`}
      className={cn(glowing && "drop-shadow-[0_0_10px_rgba(201,168,76,0.7)]", className)}
      animate={animated ? { rotate: 360 } : undefined}
      transition={animated ? { duration: 120, repeat: Infinity, ease: "linear" } : undefined}
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="48"
        fill="currentColor"
        fontFamily="var(--font-display)"
      >
        {glyph}
      </text>
    </motion.svg>
  );
}
