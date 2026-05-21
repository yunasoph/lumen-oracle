import { Metadata } from "next";
import { OracleCard } from "@/components/ui/OracleCard";

export const metadata: Metadata = {
  title: "About",
  description: "Discover the philosophy behind Lumen Oracle.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl uppercase tracking-[0.3em] text-gold">Our Cosmic Mission</h1>
        <p className="text-lg text-moonlight/70">
          Lumen Oracle is an art deco observatory for modern mystics — a place where astrology, tarot,
          and ritual merge into a luminous digital sanctuary.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <OracleCard>
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Celestial Craft</h2>
          <p>
            Every interaction is tuned to sacred geometry, slow-blooming motion, and the glow of
            antique gold.
          </p>
        </OracleCard>
        <OracleCard>
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Mystic Intelligence</h2>
          <p>
            Our readings blend astronomical computation with poetic interpretation and AI-guided
            insight.
          </p>
        </OracleCard>
        <OracleCard>
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Ritual Rhythm</h2>
          <p>
            The moon, planets, and cards are woven into daily rituals that guide reflection and
            self-discovery.
          </p>
        </OracleCard>
        <OracleCard>
          <h2 className="text-lg uppercase tracking-[0.2em] text-gold">Timeless Design</h2>
          <p>
            The interface honors 1920s art deco precision while embracing cosmic photography and
            sacred geometry.
          </p>
        </OracleCard>
      </div>
    </div>
  );
}
