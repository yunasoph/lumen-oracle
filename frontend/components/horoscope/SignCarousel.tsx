"use client";

import { zodiacSigns } from "@/lib/zodiac";
import { cn } from "@/lib/utils";
import { ZodiacGlyph } from "@/components/ui/ZodiacGlyph";

type SignCarouselProps = {
  selected?: string;
  onSelect?: (sign: string) => void;
};

export function SignCarousel({ selected, onSelect }: SignCarouselProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {zodiacSigns.map((sign) => (
        <button
          key={sign.key}
          type="button"
          onClick={() => onSelect?.(sign.key)}
          className={cn(
            "min-w-[120px] rounded-2xl border border-gold/20 bg-obsidian-light/60 px-4 py-4 text-left transition-all",
            selected === sign.key && "border-gold/70 shadow-gold-glow -translate-y-1",
          )}
        >
          <ZodiacGlyph sign={sign.key} size={40} glowing={selected === sign.key} />
          <div className="mt-2 text-sm uppercase tracking-[0.2em] text-moonlight">
            {sign.name}
          </div>
          <div className="text-xs text-moonlight/60">{sign.dateRange}</div>
        </button>
      ))}
    </div>
  );
}
