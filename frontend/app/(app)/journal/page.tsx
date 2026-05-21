import { Metadata } from "next";
import { JournalClient } from "@/components/journal/JournalClient";

export const metadata: Metadata = {
  title: "Journal",
  description: "Record your lunar reflections.",
};

export default function JournalPage() {
  return <JournalClient />;
}
