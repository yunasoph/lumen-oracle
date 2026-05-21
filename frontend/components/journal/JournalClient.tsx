"use client";

import { useState } from "react";
import { OracleCard } from "@/components/ui/OracleCard";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { useJournal } from "@/hooks/useJournal";

export function JournalClient() {
  const { data } = useJournal();
  const [entry, setEntry] = useState("");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Journal</h1>
        <p className="text-moonlight/70">Capture your lunar reflections.</p>
      </div>
      <OracleCard>
        <textarea
          value={entry}
          onChange={(event) => setEntry(event.target.value)}
          placeholder="Write your ritual reflection..."
          className="min-h-[140px] w-full rounded-2xl border border-gold/30 bg-transparent p-4 text-moonlight"
        />
        <div className="mt-4 flex justify-end">
          <CosmicButton>Save Entry</CosmicButton>
        </div>
      </OracleCard>
      <div className="grid gap-4">
        {(data ?? []).length === 0 ? (
          <OracleCard>No entries yet. Begin your cosmic archive.</OracleCard>
        ) : (
          data?.map((item) => (
            <OracleCard key={item.id}>
              <h3 className="text-sm uppercase tracking-[0.2em] text-gold">{item.title}</h3>
              <p className="text-sm text-moonlight/70">{item.content}</p>
            </OracleCard>
          ))
        )}
      </div>
    </div>
  );
}
