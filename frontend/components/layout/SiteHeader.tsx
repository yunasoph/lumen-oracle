"use client";

import Link from "next/link";
import { CosmicButton } from "@/components/ui/CosmicButton";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex w-full items-center justify-between px-6 py-6 md:px-12">
      <Link href="/" className="text-lg font-display tracking-[0.4em] text-gold">
        LUMEN
      </Link>
      <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.2em] text-moonlight/70 md:flex">
        <Link href="/about" className="hover:text-gold">
          About
        </Link>
        <Link href="/horoscope" className="hover:text-gold">
          Horoscope
        </Link>
        <Link href="/tarot" className="hover:text-gold">
          Tarot
        </Link>
        <Link href="/birth-chart" className="hover:text-gold">
          Birth Chart
        </Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-xs uppercase tracking-[0.2em] text-moonlight/70 hover:text-gold">
          Sign In
        </Link>
        <CosmicButton variant="secondary">Begin</CosmicButton>
      </div>
    </header>
  );
}
