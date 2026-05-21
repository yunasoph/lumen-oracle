"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
  tags?: string[];
};

export type JournalEntryInput = {
  title: string;
  content: string;
  mood: string;
  tags?: string[];
};

export function useJournal() {
  return useQuery({
    queryKey: ["journal"],
    queryFn: () => apiGet<JournalEntry[]>("/journal"),
  });
}

export function useCreateJournalEntry() {
  return useMutation({
    mutationFn: (payload: JournalEntryInput) =>
      apiPost<JournalEntry, JournalEntryInput>("/journal", payload),
  });
}

export function useUpdateJournalEntry() {
  return useMutation({
    mutationFn: (payload: { id: string; data: Partial<JournalEntryInput> }) =>
      apiPatch<JournalEntry, Partial<JournalEntryInput>>(`/journal/${payload.id}`, payload.data),
  });
}

export function useDeleteJournalEntry() {
  return useMutation({
    mutationFn: (id: string) => apiDelete<{ success: boolean }>(`/journal/${id}`),
  });
}
