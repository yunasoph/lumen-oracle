import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0F",
        "obsidian-light": "#12121A",
        gold: "#C9A84C",
        "gold-light": "#E2C57A",
        "gold-dark": "#9B7C32",
        moonlight: "#F0EEE9",
        "rose-dust": "#D4A5A5",
        "teal-night": "#1A4A4A",
        "teal-light": "#2A6A6A",
        "cosmic-purple": "#2D1B4E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(201, 168, 76, 0.35)",
        "gold-soft": "0 0 12px rgba(201, 168, 76, 0.2)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(45, 27, 78, 0.6), rgba(10, 10, 15, 0.95) 60%)",
      },
      animation: {
        "slow-spin": "spin 120s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201, 168, 76, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(201, 168, 76, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
