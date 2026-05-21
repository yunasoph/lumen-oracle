import { Metadata } from "next";
import { MoonClient } from "@/components/moon/MoonClient";

export const metadata: Metadata = {
  title: "Moon Phase",
  description: "Follow the moon's sacred rhythm.",
};

export default function MoonPage() {
  return <MoonClient />;
}
