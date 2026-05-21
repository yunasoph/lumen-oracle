import { Metadata } from "next";
import { zodiacByKey, zodiacSigns } from "@/lib/zodiac";
import { OracleCard } from "@/components/ui/OracleCard";
import { EnergyOrbs } from "@/components/ui/EnergyOrbs";

type HoroscopeParams = {
  sign: string;
};

type HoroscopePageProps = {
  params: Promise<HoroscopeParams>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return zodiacSigns.map((sign) => ({ sign: sign.key }));
}

export async function generateMetadata({ params }: HoroscopePageProps): Promise<Metadata> {
  const resolved = await params;
  const sign = zodiacByKey[resolved.sign];
  return {
    title: `${sign?.name ?? resolved.sign} Horoscope`,
    description: `Daily horoscope for ${sign?.name ?? resolved.sign}.`,
  };
}

export default async function HoroscopeSignPage({ params }: HoroscopePageProps) {
  const resolved = await params;
  const sign = zodiacByKey[resolved.sign];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">
          {sign?.name ?? resolved.sign} · Daily Horoscope
        </h1>
        <p className="text-moonlight/70">A ceremonial glimpse into today&apos;s cosmic rhythm.</p>
      </div>
      <OracleCard>
        <p className="text-sm text-moonlight/70">
          The stars invite you to lean into your {sign?.element ?? "celestial"} gifts. Let ritual
          guide the way.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <EnergyOrbs rating={4} />
          <span className="rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            Lucky 7
          </span>
          <span className="rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
            Moonlight
          </span>
        </div>
      </OracleCard>
    </div>
  );
}
