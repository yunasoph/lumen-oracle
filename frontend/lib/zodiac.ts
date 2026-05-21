export type ZodiacElement = "fire" | "earth" | "air" | "water";
export type ZodiacModality = "cardinal" | "fixed" | "mutable";

export type ZodiacSign = {
  key: string;
  name: string;
  glyph: string;
  element: ZodiacElement;
  modality: ZodiacModality;
  dateRange: string;
  accent: string;
};

export const zodiacSigns: ZodiacSign[] = [
  {
    key: "aries",
    name: "Aries",
    glyph: "♈︎",
    element: "fire",
    modality: "cardinal",
    dateRange: "Mar 21 – Apr 19",
    accent: "#F48C8C",
  },
  {
    key: "taurus",
    name: "Taurus",
    glyph: "♉︎",
    element: "earth",
    modality: "fixed",
    dateRange: "Apr 20 – May 20",
    accent: "#8CBF9F",
  },
  {
    key: "gemini",
    name: "Gemini",
    glyph: "♊︎",
    element: "air",
    modality: "mutable",
    dateRange: "May 21 – Jun 20",
    accent: "#EAC77E",
  },
  {
    key: "cancer",
    name: "Cancer",
    glyph: "♋︎",
    element: "water",
    modality: "cardinal",
    dateRange: "Jun 21 – Jul 22",
    accent: "#7BAFD4",
  },
  {
    key: "leo",
    name: "Leo",
    glyph: "♌︎",
    element: "fire",
    modality: "fixed",
    dateRange: "Jul 23 – Aug 22",
    accent: "#F2B27F",
  },
  {
    key: "virgo",
    name: "Virgo",
    glyph: "♍︎",
    element: "earth",
    modality: "mutable",
    dateRange: "Aug 23 – Sep 22",
    accent: "#9CC7A9",
  },
  {
    key: "libra",
    name: "Libra",
    glyph: "♎︎",
    element: "air",
    modality: "cardinal",
    dateRange: "Sep 23 – Oct 22",
    accent: "#EAC77E",
  },
  {
    key: "scorpio",
    name: "Scorpio",
    glyph: "♏︎",
    element: "water",
    modality: "fixed",
    dateRange: "Oct 23 – Nov 21",
    accent: "#7BAFD4",
  },
  {
    key: "sagittarius",
    name: "Sagittarius",
    glyph: "♐︎",
    element: "fire",
    modality: "mutable",
    dateRange: "Nov 22 – Dec 21",
    accent: "#F2B27F",
  },
  {
    key: "capricorn",
    name: "Capricorn",
    glyph: "♑︎",
    element: "earth",
    modality: "cardinal",
    dateRange: "Dec 22 – Jan 19",
    accent: "#8CBF9F",
  },
  {
    key: "aquarius",
    name: "Aquarius",
    glyph: "♒︎",
    element: "air",
    modality: "fixed",
    dateRange: "Jan 20 – Feb 18",
    accent: "#EAC77E",
  },
  {
    key: "pisces",
    name: "Pisces",
    glyph: "♓︎",
    element: "water",
    modality: "mutable",
    dateRange: "Feb 19 – Mar 20",
    accent: "#7BAFD4",
  },
];

export const zodiacByKey = zodiacSigns.reduce<Record<string, ZodiacSign>>(
  (acc, sign) => {
    acc[sign.key] = sign;
    return acc;
  },
  {},
);
