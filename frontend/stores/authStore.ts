"use client";

import { create } from "zustand";
import { setAuthTokens, clearAuthTokens } from "@/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setSession: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setSession: (user, accessToken, refreshToken) => {
    setAuthTokens(accessToken, refreshToken);
    set({ user, accessToken, refreshToken });
  },
  clearSession: () => {
    clearAuthTokens();
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));
