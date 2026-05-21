import type { MetadataRoute } from "next";
import { zodiacSigns } from "@/lib/zodiac";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lumenoracle.com";
  const routes = [
    "",
    "/about",
    "/dashboard",
    "/horoscope",
    "/birth-chart",
    "/tarot",
    "/moon",
    "/compatibility",
    "/journal",
    "/settings",
    "/login",
    "/register",
  ];

  const signRoutes = zodiacSigns.map((sign) => `/horoscope/${sign.key}`);

  return [...routes, ...signRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
