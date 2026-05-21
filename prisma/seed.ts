import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const zodiacSigns = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

const themes = ['Love', 'Career', 'Spirituality', 'Wealth', 'Health', 'Creativity'];
const colors = ['Crimson', 'Emerald', 'Sapphire', 'Golden', 'Violet', 'Silver', 'Coral'];
const phaseNames = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent',
];

const astroConnections = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
  'Sun',
  'Moon',
  'Mercury',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Pluto',
];

const majorArcanaNames = [
  'The Fool',
  'The Magician',
  'The High Priestess',
  'The Empress',
  'The Emperor',
  'The Hierophant',
  'The Lovers',
  'The Chariot',
  'Strength',
  'The Hermit',
  'Wheel of Fortune',
  'Justice',
  'The Hanged Man',
  'Death',
  'Temperance',
  'The Devil',
  'The Tower',
  'The Star',
  'The Moon',
  'The Sun',
  'Judgement',
  'The World',
];

const suitOrder = ['Wands', 'Cups', 'Swords', 'Pentacles'] as const;
const suitElements: Record<(typeof suitOrder)[number], string> = {
  Wands: 'Fire',
  Cups: 'Water',
  Swords: 'Air',
  Pentacles: 'Earth',
};
const ranks = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Page',
  'Knight',
  'Queen',
  'King',
];

const toUtcDate = (base: Date, offsetDays = 0) =>
  new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + offsetDays));

const addDays = (base: Date, offsetDays: number) =>
  new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + offsetDays));

const buildDailyHoroscopes = (startDate: Date) => {
  const entries = [] as {
    zodiac_sign: string;
    period_type: 'daily';
    period_date: Date;
    theme: string;
    content: string;
    lucky_number: number;
    lucky_color: string;
    energy_rating: number;
    compatibility_sign: string;
  }[];

  for (let dayOffset = 0; dayOffset < 30; dayOffset += 1) {
    const periodDate = addDays(startDate, dayOffset);
    zodiacSigns.forEach((sign, index) => {
      const theme = themes[(dayOffset + index) % themes.length];
      const luckyNumber = ((dayOffset + index) % 9) + 1;
      const luckyColor = colors[(dayOffset + index) % colors.length];
      const energyRating = ((dayOffset + index) % 5) + 1;
      const compatibilitySign = zodiacSigns[(index + dayOffset + 1) % zodiacSigns.length];

      entries.push({
        zodiac_sign: sign,
        period_type: 'daily',
        period_date: periodDate,
        theme,
        content: `${sign} leans into ${theme.toLowerCase()} momentum today. Trust your instincts and move with intention.`,
        lucky_number: luckyNumber,
        lucky_color: luckyColor,
        energy_rating: energyRating,
        compatibility_sign: compatibilitySign,
      });
    });
  }

  return entries;
};

const buildTarotCards = () => {
  const cards: {
    id: number;
    name: string;
    arcana: 'major' | 'minor';
    suit: string | null;
    number: number;
    upright_meaning: string;
    reversed_meaning: string;
    image_url: string;
    keywords: string[];
    element: string;
    astro_connection: string;
  }[] = [];

  let idCounter = 1;

  majorArcanaNames.forEach((name, index) => {
    cards.push({
      id: idCounter,
      name,
      arcana: 'major',
      suit: null,
      number: index,
      upright_meaning: `Upright: ${name} invites clarity and higher guidance.`,
      reversed_meaning: `Reversed: ${name} suggests a call to realign with your truth.`,
      image_url: `https://example.com/tarot/${idCounter}.png`,
      keywords: ['insight', 'awakening', 'guidance'],
      element: 'Spirit',
      astro_connection: astroConnections[index % astroConnections.length],
    });
    idCounter += 1;
  });

  suitOrder.forEach((suit) => {
    ranks.forEach((rank, index) => {
      const name = `${rank} of ${suit}`;
      const element = suitElements[suit];
      cards.push({
        id: idCounter,
        name,
        arcana: 'minor',
        suit,
        number: index + 1,
        upright_meaning: `Upright: ${name} highlights ${element.toLowerCase()} energy and daily lessons.`,
        reversed_meaning: `Reversed: ${name} asks for balance within ${element.toLowerCase()} matters.`,
        image_url: `https://example.com/tarot/${idCounter}.png`,
        keywords: [element.toLowerCase(), rank.toLowerCase(), 'movement'],
        element,
        astro_connection: zodiacSigns[idCounter % zodiacSigns.length],
      });
      idCounter += 1;
    });
  });

  return cards;
};

const buildMoonPhases = (startDate: Date, endDate: Date) => {
  const entries = [] as {
    phase_name: string;
    phase_date: Date;
    phase_time: Date;
    zodiac_sign: string;
    ritual_suggestion: string;
    affirmation: string;
  }[];

  const phaseTime = new Date(Date.UTC(1970, 0, 1, 6, 0, 0));
  let dayIndex = 0;

  for (let cursor = new Date(startDate); cursor <= endDate; cursor = addDays(cursor, 1)) {
    const phaseName = phaseNames[Math.floor(dayIndex / 4) % phaseNames.length];
    const zodiacSign = zodiacSigns[dayIndex % zodiacSigns.length];

    entries.push({
      phase_name: phaseName,
      phase_date: new Date(cursor),
      phase_time: phaseTime,
      zodiac_sign: zodiacSign,
      ritual_suggestion: `Center your ritual around ${phaseName.toLowerCase()} intentions in ${zodiacSign}.`,
      affirmation: `I welcome ${phaseName.toLowerCase()} wisdom with steady grace.`,
    });

    dayIndex += 1;
  }

  return entries;
};

const buildCosmicEvents = (startDate: Date) => {
  const templates = [
    {
      event_type: 'Mercury Retrograde',
      title: 'Mercury Retrograde in Leo',
      description: 'A reflective cycle for communication and creative expression.',
      intensity: 'moderate' as const,
      icon_name: 'mercury-retrograde',
    },
    {
      event_type: 'Solar Eclipse',
      title: 'Solar Eclipse in Virgo',
      description: 'A reset portal for routines, healing, and devotion.',
      intensity: 'transformative' as const,
      icon_name: 'solar-eclipse',
    },
    {
      event_type: 'Venus Trine Jupiter',
      title: 'Venus Trine Jupiter',
      description: 'A gentle opening for love, abundance, and gratitude.',
      intensity: 'gentle' as const,
      icon_name: 'venus-trine-jupiter',
    },
    {
      event_type: 'Mars Square Saturn',
      title: 'Mars Square Saturn',
      description: 'Momentum meets discipline, calling for patience and strategy.',
      intensity: 'powerful' as const,
      icon_name: 'mars-square-saturn',
    },
    {
      event_type: 'Lunar Eclipse',
      title: 'Lunar Eclipse in Pisces',
      description: 'An emotional release that honors intuition and surrender.',
      intensity: 'transformative' as const,
      icon_name: 'lunar-eclipse',
    },
    {
      event_type: 'Venus Enters Libra',
      title: 'Venus Enters Libra',
      description: 'Relationships seek harmony, beauty, and balance.',
      intensity: 'gentle' as const,
      icon_name: 'venus-libra',
    },
    {
      event_type: 'Jupiter Conjunct Moon',
      title: 'Jupiter Conjunct Moon',
      description: 'Emotional expansion and nourishment bloom outward.',
      intensity: 'moderate' as const,
      icon_name: 'jupiter-moon',
    },
    {
      event_type: 'Neptune Retrograde',
      title: 'Neptune Retrograde in Aries',
      description: 'Dreams clarify while illusion lifts.',
      intensity: 'moderate' as const,
      icon_name: 'neptune-retrograde',
    },
    {
      event_type: 'Saturn Direct',
      title: 'Saturn Direct in Aquarius',
      description: 'Long-term commitments regain momentum and structure.',
      intensity: 'powerful' as const,
      icon_name: 'saturn-direct',
    },
    {
      event_type: 'Uranus Sextile Sun',
      title: 'Uranus Sextile Sun',
      description: 'Fresh breakthroughs spark authentic expression.',
      intensity: 'moderate' as const,
      icon_name: 'uranus-sun',
    },
  ];

  return templates.map((template, index) => {
    const eventStart = addDays(startDate, 5 + index * 7);
    const eventEnd = addDays(eventStart, 4);
    const affectedSigns = [
      zodiacSigns[index % zodiacSigns.length],
      zodiacSigns[(index + 3) % zodiacSigns.length],
      zodiacSigns[(index + 6) % zodiacSigns.length],
    ];

    return {
      event_type: template.event_type,
      title: template.title,
      description: template.description,
      start_date: eventStart,
      end_date: eventEnd,
      affected_signs: affectedSigns,
      intensity: template.intensity,
      icon_name: template.icon_name,
    };
  });
};

const main = async () => {
  const today = toUtcDate(new Date());
  const endDate = new Date(today);
  endDate.setUTCMonth(endDate.getUTCMonth() + 6);

  await prisma.horoscope.deleteMany();
  await prisma.tarotCard.deleteMany();
  await prisma.moonPhase.deleteMany();
  await prisma.cosmicEvent.deleteMany();

  await prisma.horoscope.createMany({
    data: buildDailyHoroscopes(today),
  });

  await prisma.tarotCard.createMany({
    data: buildTarotCards(),
  });

  await prisma.moonPhase.createMany({
    data: buildMoonPhases(today, endDate),
  });

  await prisma.cosmicEvent.createMany({
    data: buildCosmicEvents(today),
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
