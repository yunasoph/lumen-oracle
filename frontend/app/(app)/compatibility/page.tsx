import { Metadata } from "next";
import { CompatibilityClient } from "@/components/compatibility/CompatibilityClient";

export const metadata: Metadata = {
  title: "Compatibility",
  description: "Reveal the synastry between two signs.",
};

export default function CompatibilityPage() {
  return <CompatibilityClient />;
}
