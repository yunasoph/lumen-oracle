"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";

export type TarotSpread = "single" | "three_card" | "celtic_cross";

export type TarotCard = {
  id: string;
  name: string;
  suit: string;
  keywords: string[];
  image_url?: string;
};

export type TarotDrawResult = {
  id: string;
  spread_type: TarotSpread;
  cards: Array<{
    card: TarotCard;
    is_reversed: boolean;
    position: string;
  }>;
  interpretation: string;
  created_at: string;
};

export function useTarotDraw() {
  return useMutation({
    mutationFn: (payload: { spread_type: TarotSpread; question?: string }) =>
      apiPost<TarotDrawResult, { spread_type: TarotSpread; question?: string }>(
        "/tarot/draw",
        payload,
      ),
  });
}

export function useTarotReadings() {
  return useQuery({
    queryKey: ["tarot", "readings"],
    queryFn: () => apiGet<TarotDrawResult[]>("/tarot/readings"),
  });
}
