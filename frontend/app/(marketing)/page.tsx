import { Metadata } from "next";
import Script from "next/script";
import { HeroSection } from "@/components/marketing/HeroSection";
import { OracleCard } from "@/components/ui/OracleCard";
import { MoonSVG } from "@/components/ui/MoonSVG";
import { ZodiacGlyph } from "@/components/ui/ZodiacGlyph";
import { zodiacSigns } from "@/lib/zodiac";

export const metadata: Metadata = {
  title: "Celestial Home",
  description: "Lumen Oracle — your celestial truth, unveiled.",
};

const testimonials = [
  { name: "Solara V.", quote: "Every reading feels like an altar of starlight.", rating: 5 },
  { name: "Cassian R.", quote: "The tarot ritual is pure theatre. I feel seen.", rating: 5 },
  { name: "Lyra M.", quote: "Gorgeous. It reads like an art deco prophecy.", rating: 4 },
];

const pricing = [
  { tier: "Free", price: "0", perks: ["Daily horoscopes", "Moon phase", "Single tarot draw"] },
  { tier: "Oracle", price: "18", perks: ["Weekly forecasts", "Birth chart", "Journal rituals"] },
  { tier: "Cosmic", price: "44", perks: ["AI readings", "Synastry report", "Private archives"] },
];

export default function MarketingHome() {
  return (
    <div className="space-y-24 pb-16">
      <Script
        id="lumen-oracle-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lumen Oracle",
            url: "https://lumenoracle.com",
            description:
              "Celestial art deco astrology readings, tarot rituals, and birth chart experiences.",
            sameAs: ["https://instagram.com/lumenoracle"],
          }),
        }}
      />
      <HeroSection />

      <section className="space-y-8 px-6 md:px-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl uppercase tracking-[0.3em] text-gold">Today&apos;s Cosmic Weather</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-moonlight/60">
            Glide Through the Zodiac
          </span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {zodiacSigns.map((sign) => (
            <OracleCard key={sign.key} className="min-w-[220px]">
              <div className="flex items-center gap-4">
                <ZodiacGlyph sign={sign.key} size={56} glowing />
                <div>
                  <div className="text-sm uppercase tracking-[0.2em] text-gold">{sign.name}</div>
                  <div className="text-xs text-moonlight/70">{sign.dateRange}</div>
                </div>
              </div>
              <p className="text-sm text-moonlight/70">
                Whispered shifts in {sign.element} ignite your {sign.modality} gifts.
              </p>
            </OracleCard>
          ))}
        </div>
      </section>

      <section className="grid gap-10 px-6 md:grid-cols-2 md:px-12">
        <OracleCard
          header={<h3 className="text-lg uppercase tracking-[0.2em] text-gold">Current Moon Phase</h3>}
        >
          <div className="flex items-center gap-6">
            <MoonSVG phase={0.62} size={120} glowing />
            <div>
              <p className="text-xl font-display text-moonlight">Waxing Gibbous</p>
              <p className="text-sm text-moonlight/70">A ritual of refinement and luminous focus.</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">
                Ritual: Anoint your journal with moonlit ink.
              </p>
            </div>
          </div>
        </OracleCard>
        <OracleCard
          header={<h3 className="text-lg uppercase tracking-[0.2em] text-gold">Coming Cosmic Events</h3>}
        >
          <ul className="space-y-4 text-sm text-moonlight/70">
            <li>May 24 — Venus trine Neptune · Dreamy attunement.</li>
            <li>May 30 — Full Moon in Sagittarius · Release and revelation.</li>
            <li>Jun 02 — Mercury enters Cancer · Words soften into ritual.</li>
          </ul>
        </OracleCard>
      </section>

      <section className="grid gap-6 px-6 md:grid-cols-2 md:px-12">
        {[
          { title: "Birth Chart", copy: "Decode houses, aspects, and star-born signatures." },
          { title: "Tarot", copy: "Ceremonial spreads with cinematic reveals." },
          { title: "Compatibility", copy: "Synastry insights for love, trust, and devotion." },
          { title: "Journal", copy: "Ritualize your reflections with lunar prompts." },
        ].map((feature) => (
          <OracleCard key={feature.title}>
            <h3 className="text-lg uppercase tracking-[0.2em] text-gold">{feature.title}</h3>
            <p className="text-sm text-moonlight/70">{feature.copy}</p>
          </OracleCard>
        ))}
      </section>

      <section className="px-6 md:px-12">
        <h2 className="text-2xl uppercase tracking-[0.3em] text-gold">Testimonials</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <OracleCard key={testimonial.name}>
              <div className="text-xs uppercase tracking-[0.2em] text-gold">{testimonial.name}</div>
              <div className="text-sm text-moonlight/70">{testimonial.quote}</div>
              <div className="mt-4 text-gold">{"★".repeat(testimonial.rating)}</div>
            </OracleCard>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12">
        <h2 className="text-2xl uppercase tracking-[0.3em] text-gold">Pricing Plans</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <OracleCard key={plan.tier}>
              <div className="text-sm uppercase tracking-[0.2em] text-gold">{plan.tier}</div>
              <div className="text-3xl font-display text-moonlight">${plan.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-moonlight/70">
                {plan.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
            </OracleCard>
          ))}
        </div>
      </section>
    </div>
  );
}
