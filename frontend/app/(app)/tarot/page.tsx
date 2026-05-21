import { Metadata } from "next";
import { TarotClient } from "@/components/tarot/TarotClient";

export const metadata: Metadata = {
  title: "Tarot",
  description: "Ceremonial tarot draws and interpretations.",
};

export default function TarotPage() {
  return <TarotClient />;
}
