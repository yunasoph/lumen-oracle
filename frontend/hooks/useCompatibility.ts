"use client";

import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";

export type CompatibilityScore = {
  category: string;
  score: number;
};

export type CompatibilityReport = {
  sign_a: string;
  sign_b: string;
  summary: string;
  scores: CompatibilityScore[];
  narrative: string[];
};

export function useCompatibility() {
  return useMutation({
    mutationFn: (payload: { sign_a: string; sign_b: string }) =>
      apiPost<CompatibilityReport, { sign_a: string; sign_b: string }>("/compatibility/check", payload),
  });
}
