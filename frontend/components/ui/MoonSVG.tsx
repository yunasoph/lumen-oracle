"use client";

type MoonSVGProps = {
  phase: number;
  size?: number;
  glowing?: boolean;
};

export function MoonSVG({ phase, size = 120, glowing = false }: MoonSVGProps) {
  const clampedPhase = Math.min(Math.max(phase, 0), 1);
  const offset = (clampedPhase - 0.5) * 80;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Moon phase"
      className={glowing ? "drop-shadow-[0_0_20px_rgba(240,238,233,0.6)]" : undefined}
    >
      <defs>
        <mask id="moon-mask">
          <rect width="120" height="120" fill="white" />
          <circle cx={60 + offset} cy="60" r="45" fill="black" />
        </mask>
      </defs>
      <circle cx="60" cy="60" r="46" fill="#F0EEE9" />
      <circle cx="60" cy="60" r="46" fill="#0A0A0F" mask="url(#moon-mask)" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
