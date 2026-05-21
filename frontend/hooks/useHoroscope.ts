"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

export type HoroscopePeriod = "daily" | "weekly" | "monthly" | "yearly";

export type HoroscopeReading = {
  sign: string;
  period: HoroscopePeriod;
  summary: string;
  lucky_number?: number;
  lucky_color?: string;
  energy?: number;
  compatibility_sign?: string;
  affirmation?: string;
};

export function useHoroscope(sign: string, period: HoroscopePeriod) {
  return useQuery({
    queryKey: ["horoscope", sign, period],
    queryFn: () => apiGet<HoroscopeReading>(`/horoscopes/${period}/${sign}`),
    enabled: Boolean(sign),
  });
}

export function useDailyHoroscopes() {
  return useQuery({
    queryKey: ["horoscope", "daily", "all"],
    queryFn: () => apiGet<HoroscopeReading[]>(`/horoscopes/today/all`),
  });
}
