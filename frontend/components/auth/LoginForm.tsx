"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CosmicButton } from "@/components/ui/CosmicButton";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block text-xs uppercase tracking-[0.2em] text-gold">
        Email
        <input
          type="email"
          {...register("email")}
          className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.2em] text-gold">
        Password
        <input
          type="password"
          {...register("password")}
          className="mt-2 w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-moonlight"
        />
      </label>
      {formState.errors.email ? (
        <p className="text-xs text-rose-dust">{formState.errors.email.message}</p>
      ) : null}
      <CosmicButton type="submit" className="w-full">
        Sign In
      </CosmicButton>
      <div className="flex items-center justify-center gap-4 text-xs text-moonlight/60">
        <button type="button" className="hover:text-gold">
          Google
        </button>
        <span>•</span>
        <button type="button" className="hover:text-gold">
          Apple
        </button>
      </div>
    </form>
  );
}
