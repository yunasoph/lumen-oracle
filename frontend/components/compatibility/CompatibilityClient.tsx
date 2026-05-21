"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { SignCarousel } from "@/components/horoscope/SignCarousel";
import { CompatibilityGauge } from "@/components/compatibility/CompatibilityGauge";
import { CosmicButton } from "@/components/ui/CosmicButton";
import { OracleCard } from "@/components/ui/OracleCard";
import { useCompatibility } from "@/hooks/useCompatibility";

export function CompatibilityClient() {
  const [signA, setSignA] = useState("aries");
  const [signB, setSignB] = useState("libra");
  const reportRef = useRef<HTMLDivElement>(null);
  const compatibility = useCompatibility();

  const handleReveal = () => {
    compatibility.mutate({ sign_a: signA, sign_b: signB });
  };

  const handleShare = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { backgroundColor: "#0A0A0F" });
    const link = document.createElement("a");
    link.download = "lumen-compatibility.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const scores =
    compatibility.data?.scores ?? [
      { category: "Love", score: 86 },
      { category: "Communication", score: 78 },
      { category: "Trust", score: 72 },
      { category: "Passion", score: 90 },
    ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Compatibility</h1>
        <p className="text-moonlight/70">Select two signs to reveal the cosmic chemistry.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <OracleCard>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold">Sign A</h2>
          <SignCarousel selected={signA} onSelect={setSignA} />
        </OracleCard>
        <OracleCard>
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold">Sign B</h2>
          <SignCarousel selected={signB} onSelect={setSignB} />
        </OracleCard>
      </div>
      <CosmicButton onClick={handleReveal}>Reveal Report</CosmicButton>
      <div ref={reportRef} className="space-y-6 rounded-3xl border border-gold/20 bg-obsidian-light/40 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {scores.map((score) => (
            <CompatibilityGauge key={score.category} label={score.category} value={score.score} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(compatibility.data?.narrative ?? [
            "Your shared curiosity keeps the spark alive.",
            "Balance independence with tender devotion.",
          ]).map((paragraph) => (
            <OracleCard key={paragraph}>{paragraph}</OracleCard>
          ))}
        </div>
      </div>
      <CosmicButton variant="secondary" onClick={handleShare}>
        Share Report
      </CosmicButton>
    </div>
  );
}
