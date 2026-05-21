"use client";

import { cn } from "@/lib/utils";

type StarfieldCssProps = {
  className?: string;
};

export function StarfieldCss({ className }: StarfieldCssProps) {
  return <div className={cn("starfield", className)} aria-hidden="true" />;
}
