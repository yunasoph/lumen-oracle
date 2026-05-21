import type { Metadata } from "next";
import { Providers } from "@/components/layout/Providers";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s · Lumen Oracle",
    default: "Lumen Oracle",
  },
  description:
    "Lumen Oracle is a celestial art deco astrology sanctuary offering luminous horoscope, tarot, and birth chart experiences.",
  metadataBase: new URL("https://lumenoracle.com"),
  openGraph: {
    title: "Lumen Oracle",
    description:
      "The most luminous astrology experience on the internet — horoscopes, tarot, and birth charts bathed in celestial art deco.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen Oracle",
    description:
      "The most luminous astrology experience on the internet — horoscopes, tarot, and birth charts bathed in celestial art deco.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-obsidian text-moonlight">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
