"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { zodiacSigns } from "@/lib/zodiac";
import { CosmicButton } from "@/components/ui/CosmicButton";

const registerSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  birth_date: z.string().min(1),
  birth_time: z.string().optional(),
  birth_city: z.string().min(2),
  birth_country: z.string().min(2),
});

type RegisterValues = z.infer<typeof registerSchema>;

const steps = ["Basic Info", "Birth Details", "Your Sign"];

export function RegisterWizard() {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, watch } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const birthDate = watch("birth_date");
  const revealedSign = useMemo(() => {
    if (!birthDate) return zodiacSigns[0];
    const month = new Date(birthDate).getMonth() + 1;
    return zodiacSigns[(month - 1) % zodiacSigns.length];
  }, [birthDate]);

  const onSubmit = (values: RegisterValues) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-moonlight/60">
        {steps.map((label, index) => (
          <span key={label} className={index === step ? "text-gold" : ""}>
            {label}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Full Name
              <input
                {...register("full_name")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold">
              Email
              <input
                type="email"
                {...register("email")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold">
              Password
              <input
                type="password"
                {...register("password")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <label className="block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Date
              <input
                type="date"
                {...register("birth_date")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Time
              <input
                type="time"
                {...register("birth_time")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold">
              Birth City
              <input
                {...register("birth_city")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-gold">
              Birth Country
              <input
                {...register("birth_country")}
                className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
              />
            </label>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center">
              <div className="text-2xl font-display text-gold">{revealedSign.name}</div>
              <div className="text-6xl text-gold">{revealedSign.glyph}</div>
              <p className="text-sm text-moonlight/70">
                {revealedSign.dateRange} · {revealedSign.element.toUpperCase()} element
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {zodiacSigns.map((sign) => (
                <span
                  key={sign.key}
                  className="text-lg text-gold/40"
                  aria-hidden="true"
                >
                  {sign.glyph}
                </span>
              ))}
            </div>
          </motion.div>
        )}
        <div className="flex items-center justify-between pt-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-xs uppercase tracking-[0.2em] text-moonlight/60 hover:text-gold"
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <CosmicButton type="button" onClick={() => setStep(step + 1)}>
              Next
            </CosmicButton>
          ) : (
            <CosmicButton type="submit">Create Account</CosmicButton>
          )}
        </div>
      </form>
    </div>
  );
}
