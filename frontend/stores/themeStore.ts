"use client";

import { create } from "zustand";

type ThemeState = {
  theme: "light" | "dark" | "system";
  setTheme: (theme: ThemeState["theme"]) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (theme) => set({ theme }),
}));
