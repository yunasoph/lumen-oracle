"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api";

export type MoonPhase = {
  phase: number;
  name: string;
  illumination: number;
  sign: string;
  next_phase?: string;
  next_phase_in_days?: number;
};

export type MoonCalendarDay = {
  date: string;
  phase: number;
  name: string;
};

export function useMoonPhase() {
  return useQuery({
    queryKey: ["moon", "current"],
    queryFn: () => apiGet<MoonPhase>("/moon/current"),
  });
}

export function useMoonCalendar(year: number, month: number) {
  return useQuery({
    queryKey: ["moon", "calendar", year, month],
    queryFn: () => apiGet<MoonCalendarDay[]>(`/moon/calendar/${year}/${month}`),
  });
}
