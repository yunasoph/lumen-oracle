import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { OracleCard } from "@/components/ui/OracleCard";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Lumen Oracle account.",
};

export default function LoginPage() {
  return (
    <OracleCard className="w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl uppercase tracking-[0.3em] text-gold">Sign In</h1>
        <p className="text-sm text-moonlight/70">Welcome back to the observatory.</p>
      </div>
      <LoginForm />
      <div className="text-center text-xs text-moonlight/60">
        New here?{" "}
        <Link href="/register" className="text-gold">
          Create an account
        </Link>
      </div>
    </OracleCard>
  );
}
