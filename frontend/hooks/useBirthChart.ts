"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet, apiPost } from "@/lib/api";

export type BirthChart = {
  id: string;
  summary: string;
  dominant_element: string;
  planets: Array<{
    name: string;
    sign: string;
    house: number;
    degree: number;
  }>;
  aspects: Array<{
    from: string;
    to: string;
    type: string;
  }>;
};

export type BirthChartInput = {
  birth_date: string;
  birth_time?: string;
  birth_city: string;
  birth_country: string;
};

export function useBirthChart() {
  return useQuery({
    queryKey: ["birthChart"],
    queryFn: () => apiGet<BirthChart>("/charts/my-chart"),
  });
}

export function useBirthChartGenerate() {
  return useMutation({
    mutationFn: (payload: BirthChartInput) => apiPost<BirthChart, BirthChartInput>("/charts/generate", payload),
  });
}
