"use client";

import Link from "next/link";
import { ZodiacGlyph } from "@/components/ui/ZodiacGlyph";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-gold/20 px-6 py-12 md:px-12">
      <div className="absolute -top-10 right-12 opacity-30">
        <ZodiacGlyph sign="aquarius" size={80} />
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-lg font-display tracking-[0.4em] text-gold">LUMEN ORACLE</div>
          <p className="max-w-md text-sm text-moonlight/60">
            Celestial art deco divination for seekers who crave ritual, clarity, and cosmic beauty.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-moonlight/70">
          <Link href="/about" className="hover:text-gold">
            About
          </Link>
          <Link href="/dashboard" className="hover:text-gold">
            Dashboard
          </Link>
          <Link href="/settings" className="hover:text-gold">
            Settings
          </Link>
        </nav>
      </div>
    </footer>
  );
}
