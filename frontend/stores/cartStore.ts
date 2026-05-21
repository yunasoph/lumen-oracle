"use client";

import { create } from "zustand";

export type CartPlan = "free" | "oracle" | "cosmic";

type CartState = {
  selectedPlan: CartPlan;
  setPlan: (plan: CartPlan) => void;
};

export const useCartStore = create<CartState>((set) => ({
  selectedPlan: "oracle",
  setPlan: (selectedPlan) => set({ selectedPlan }),
}));
