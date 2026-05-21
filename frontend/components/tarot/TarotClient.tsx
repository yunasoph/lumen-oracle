"use client";

import { useEffect, useMemo, useState } from "react";
import { TarotCardFrame } from "@/components/tarot/TarotCardFrame";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { OracleCard } from "@/components/ui/OracleCard";

const tarotDeck = [
  { name: "The Star", keywords: ["Hope", "Renewal", "Grace"] },
  { name: "The High Priestess", keywords: ["Intuition", "Mystery", "Wisdom"] },
  { name: "The Sun", keywords: ["Joy", "Vitality", "Clarity"] },
  { name: "The Lovers", keywords: ["Union", "Choice", "Harmony"] },
  { name: "The Moon", keywords: ["Dreams", "Illusion", "Depth"] },
  { name: "The Magician", keywords: ["Manifestation", "Power", "Focus"] },
];

const spreads = [
  { key: "single", label: "Single Card", count: 1 },
  { key: "three_card", label: "Three-Card", count: 3 },
  { key: "celtic_cross", label: "Celtic Cross", count: 6 },
];

type SpreadKey = (typeof spreads)[number]["key"];

type Reading = {
  id: string;
  question: string;
  cards: string[];
  interpretation: string;
};

export function TarotClient() {
  const [question, setQuestion] = useState("");
  const [spread, setSpread] = useState<SpreadKey>("single");
  const [drawnCards, setDrawnCards] = useState<typeof tarotDeck>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [interpretation, setInterpretation] = useState("");
  const [history, setHistory] = useState<Reading[]>([]);

  const spreadCount = useMemo(
    () => spreads.find((item) => item.key === spread)?.count ?? 1,
    [spread],
  );

  useEffect(() => {
    if (drawnCards.length === 0) return;
    setRevealedCount(0);
    const interval = window.setInterval(() => {
      setRevealedCount((prev) => {
        if (prev + 1 >= drawnCards.length) {
          window.clearInterval(interval);
        }
        return Math.min(prev + 1, drawnCards.length);
      });
    }, 420);
    return () => window.clearInterval(interval);
  }, [drawnCards]);

  const handleDraw = () => {
    const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, spreadCount);
    setDrawnCards(selection);
    setInterpretation(
      "The oracle speaks in gentle paradoxes: trust your intuition and honor the quiet invitation of change.",
    );
    setHistory((prev) => [
      {
        id: `${Date.now()}`,
        question: question || "Unspoken inquiry",
        cards: selection.map((card) => card.name),
        interpretation: "A luminous path opens when you choose devotion to your inner knowing.",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-10 rounded-3xl bg-[#0D0B14]/80 p-6">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Tarot</h1>
        <p className="text-moonlight/70">Ask your question and let the Oracle reveal.</p>
      </div>
      <OracleCard>
        <label className="text-xs uppercase tracking-[0.2em] text-gold">Ask your question</label>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="What does the Oracle reveal..."
          className="mt-3 w-full rounded-xl border border-gold/40 bg-transparent px-4 py-3 text-moonlight placeholder:text-moonlight/50"
        />
      </OracleCard>
      <div className="grid gap-4 md:grid-cols-3">
        {spreads.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setSpread(option.key)}
            className={`rounded-2xl border px-4 py-6 text-left ${
              spread === option.key ? "border-gold shadow-gold-glow" : "border-gold/20"
            }`}
          >
            <div className="text-sm uppercase tracking-[0.2em] text-gold">{option.label}</div>
            <div className="text-xs text-moonlight/60">{option.count} cards</div>
          </button>
        ))}
      </div>
      <CosmicButton className="w-full md:w-auto" onClick={handleDraw}>
        Draw Cards
      </CosmicButton>
      <div className="grid gap-6 md:grid-cols-3">
        {drawnCards.map((card, index) => (
          <TarotCardFrame
            key={card.name}
            card={card}
            isReversed={index % 2 === 1}
            isFlipping={index < revealedCount}
          />
        ))}
      </div>
      {interpretation ? (
        <OracleCard>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">AI Interpretation</h3>
          <p className="text-sm text-moonlight/70">{interpretation}</p>
        </OracleCard>
      ) : null}
      <OracleCard>
        <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Reading History</h3>
        <div className="divide-y divide-gold/10">
          {history.length === 0 ? (
            <p className="py-4 text-sm text-moonlight/60">No readings yet.</p>
          ) : (
            history.map((reading) => (
              <details key={reading.id} className="py-4">
                <summary className="cursor-pointer text-sm text-moonlight/80">
                  {reading.question}
                </summary>
                <div className="mt-2 text-xs text-moonlight/60">
                  Cards: {reading.cards.join(", ")}
                </div>
                <div className="mt-2 text-sm text-moonlight/70">{reading.interpretation}</div>
              </details>
            ))
          )}
        </div>
      </OracleCard>
    </div>
  );
}
