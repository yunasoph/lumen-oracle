import { ImageResponse } from "next/og";
import { zodiacByKey } from "@/lib/zodiac";

export const runtime = "edge";

type OgProps = {
  params: { sign: string };
};

export default function OpenGraphImage({ params }: OgProps) {
  const sign = zodiacByKey[params.sign];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(120deg, #0A0A0F 0%, #2D1B4E 55%, #0A0A0F 100%)",
          color: "#F0EEE9",
          fontFamily: "serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", letterSpacing: "0.2em", color: "#C9A84C" }}>
            {sign?.name ?? params.sign}
          </div>
          <div style={{ fontSize: "32px", marginTop: "16px" }}>Daily Horoscope</div>
          <div style={{ fontSize: "20px", marginTop: "8px", opacity: 0.7 }}>
            Lumen Oracle
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
