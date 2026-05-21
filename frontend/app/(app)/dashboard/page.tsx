import { Metadata } from "next";
import { OracleCard } from "@/components/ui/OracleCard";
import { MoonSVG } from "@/components/ui/MoonSVG";
import { EnergyOrbs } from "@/components/ui/EnergyOrbs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal astrology hub.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Welcome back, Aurora.</h1>
        <p className="text-moonlight/70">The stars are luminous for you today.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <OracleCard>
          <h2 className="text-sm uppercase tracking-[0.2em] text-gold">Today&apos;s Mini Horoscope</h2>
          <p className="text-sm text-moonlight/70">
            A quiet tide of clarity runs beneath your conversations. Let softness lead.
          </p>
          <div className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">Read Full</div>
        </OracleCard>
        <OracleCard>
          <h2 className="text-sm uppercase tracking-[0.2em] text-gold">Moon Phase</h2>
          <div className="flex items-center gap-4">
            <MoonSVG phase={0.58} size={80} glowing />
            <div>
              <div className="text-lg font-display text-moonlight">Waxing Gibbous</div>
              <div className="text-xs uppercase tracking-[0.2em] text-moonlight/70">In Taurus</div>
            </div>
          </div>
        </OracleCard>
        <OracleCard>
          <h2 className="text-sm uppercase tracking-[0.2em] text-gold">Energy</h2>
          <EnergyOrbs rating={4} />
          <p className="text-xs text-moonlight/60">Radiant and grounded.</p>
        </OracleCard>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <OracleCard>
          <h2 className="text-sm uppercase tracking-[0.2em] text-gold">Upcoming Events</h2>
          <ul className="space-y-3 text-sm text-moonlight/70">
            <li>Mercury trine Saturn — steady conversations.</li>
            <li>Full Moon in Sagittarius — release & revelation.</li>
            <li>Venus enters Leo — magnetic charm.</li>
          </ul>
        </OracleCard>
        <OracleCard>
          <h2 className="text-sm uppercase tracking-[0.2em] text-gold">Recent Tarot</h2>
          <p className="text-sm text-moonlight/70">The Star · Upright — Hope, renewal, luminosity.</p>
          <div className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">View Reading</div>
        </OracleCard>
      </div>
    </div>
  );
}
