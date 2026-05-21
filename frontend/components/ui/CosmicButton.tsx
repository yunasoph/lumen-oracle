"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CosmicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function CosmicButton({
  variant = "primary",
  className,
  ...props
}: CosmicButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian";
  const variants = {
    primary: "bg-gold text-obsidian shadow-gold-glow hover:shadow-gold-glow/80",
    secondary: "border border-gold/70 text-gold hover:bg-gold/10",
    ghost: "text-moonlight hover:text-gold",
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
