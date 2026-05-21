"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StarfieldCss } from "@/components/cosmic/StarfieldCss";

const StarfieldCanvas = dynamic(() => import("./StarfieldCanvas"), { ssr: false });

type StarfieldProps = {
  className?: string;
};

export function Starfield({ className }: StarfieldProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (isMobile) {
    return <StarfieldCss className={className} />;
  }

  return (
    <div className={className}>
      <StarfieldCanvas />
    </div>
  );
}
