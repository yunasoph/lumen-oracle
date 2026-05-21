"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TarotCardFrameProps = {
  card: {
    name: string;
    image?: string;
    keywords?: string[];
  };
  isReversed?: boolean;
  isFlipping?: boolean;
  onFlipComplete?: () => void;
};

export function TarotCardFrame({
  card,
  isReversed = false,
  isFlipping = false,
  onFlipComplete,
}: TarotCardFrameProps) {
  return (
    <motion.div
      className="relative h-72 w-48 perspective-[1200px]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={cn(
          "relative h-full w-full rounded-2xl border border-gold/40 bg-obsidian/80 shadow-gold-soft",
          "transform-style-preserve-3d",
        )}
        animate={{ rotateY: isFlipping ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        onAnimationComplete={onFlipComplete}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-transparent backface-hidden">
          <span className="text-xs uppercase tracking-[0.5em] text-gold">Lumen</span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-obsidian/90 px-4 py-5 text-center backface-hidden [transform:rotateY(180deg)]">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.name}
              width={160}
              height={200}
              className={cn("mx-auto rounded-xl", isReversed && "rotate-180")}
            />
          ) : (
            <div className="mx-auto flex h-44 w-28 items-center justify-center rounded-xl border border-gold/40 text-gold/80">
              {card.name}
            </div>
          )}
          <div className="mt-3 text-sm uppercase tracking-[0.2em] text-gold">{card.name}</div>
          <div className="mt-1 text-xs text-moonlight/70">
            {isReversed ? "Reversed" : "Upright"}
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {card.keywords?.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-gold/30 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-gold"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
