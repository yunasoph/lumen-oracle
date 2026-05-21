import { Metadata } from "next";
import { HoroscopeClient } from "@/components/horoscope/HoroscopeClient";

export const metadata: Metadata = {
  title: "Horoscope",
  description: "Personalized horoscope readings.",
};

export default function HoroscopePage() {
  return <HoroscopeClient />;
}
