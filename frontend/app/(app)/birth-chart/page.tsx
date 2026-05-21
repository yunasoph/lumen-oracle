import { Metadata } from "next";
import { BirthChartClient } from "@/components/birth-chart/BirthChartClient";

export const metadata: Metadata = {
  title: "Birth Chart",
  description: "Generate and explore your full birth chart.",
};

export default function BirthChartPage() {
  return <BirthChartClient />;
}
