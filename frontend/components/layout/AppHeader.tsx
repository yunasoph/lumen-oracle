"use client";

import Link from "next/link";
import { CosmicButton } from "@/components/ui/CosmicButton";

const appLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/birth-chart", label: "Birth Chart" },
  { href: "/tarot", label: "Tarot" },
  { href: "/moon", label: "Moon" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/journal", label: "Journal" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gold/20 bg-obsidian/90 px-6 py-4 backdrop-blur-md">
      <Link href="/" className="text-sm font-display tracking-[0.4em] text-gold">
        LUMEN
      </Link>
      <nav className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-moonlight/70 xl:flex">
        {appLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-gold">
            {link.label}
          </Link>
        ))}
      </nav>
      <CosmicButton variant="ghost">Upgrade</CosmicButton>
    </header>
  );
}
