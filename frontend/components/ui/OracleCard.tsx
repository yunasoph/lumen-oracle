"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type OracleCardProps = {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function OracleCard({ header, footer, className, children }: OracleCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-gold/30 bg-obsidian/70 p-6 shadow-gold-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-gold-glow",
        className,
      )}
    >
      {header ? <div className="mb-4 flex items-center justify-between">{header}</div> : null}
      <div className="space-y-4">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
