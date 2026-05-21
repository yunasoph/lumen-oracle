"use client";

import { ReactNode } from "react";
import { StarfieldCss } from "@/components/cosmic/StarfieldCss";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <StarfieldCss className="absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
