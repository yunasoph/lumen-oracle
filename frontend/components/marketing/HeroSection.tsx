"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { ZodiacGlyph } from "@/components/ui/ZodiacGlyph";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        className="flex h-[340px] w-[340px] items-center justify-center rounded-full border border-gold/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <ZodiacGlyph sign="leo" size={240} animated={false} glowing className="text-gold/80" />
      </motion.div>
      <h1 className="mt-8 text-4xl uppercase tracking-[0.35em] text-gold sm:text-6xl">
        <span className="gold-shimmer">Lumen Oracle</span>
      </h1>
      <p className="mt-4 text-lg italic text-moonlight/80">Your celestial truth, unveiled.</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/birth-chart">
          <CosmicButton variant="secondary">Read Your Chart</CosmicButton>
        </Link>
        <Link href="/tarot">
          <CosmicButton>Draw Your Cards</CosmicButton>
        </Link>
      </div>
    </section>
  );
}
