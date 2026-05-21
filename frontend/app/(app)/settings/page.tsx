import { Metadata } from "next";
import { OracleCard } from "@/components/ui/OracleCard";
import { CosmicButton } from "@/components/ui/CosmicButton";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your oracle profile and preferences.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl uppercase tracking-[0.3em] text-gold">Settings</h1>
        <p className="text-moonlight/70">Refine your celestial profile.</p>
      </div>
      <OracleCard>
        <form className="space-y-4">
          <label className="block text-xs uppercase tracking-[0.2em] text-gold">
            Full Name
            <input
              type="text"
              placeholder="Aurora Celeste"
              className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-gold">
            Birth Location
            <input
              type="text"
              placeholder="Paris, France"
              className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
            />
          </label>
          <CosmicButton type="submit">Save</CosmicButton>
        </form>
      </OracleCard>
    </div>
  );
}
