import { Metadata } from "next";
import Link from "next/link";
import { RegisterWizard } from "@/components/auth/RegisterWizard";
import { OracleCard } from "@/components/ui/OracleCard";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Lumen Oracle account.",
};

export default function RegisterPage() {
  return (
    <OracleCard className="w-full max-w-xl">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl uppercase tracking-[0.3em] text-gold">Register</h1>
        <p className="text-sm text-moonlight/70">Begin your celestial journey.</p>
      </div>
      <RegisterWizard />
      <div className="text-center text-xs text-moonlight/60">
        Already have an account?{" "}
        <Link href="/login" className="text-gold">
          Sign in
        </Link>
      </div>
    </OracleCard>
  );
}
