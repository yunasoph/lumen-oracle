const baseScores = {
  fire: 80,
  earth: 70,
  air: 75,
  water: 78,
};

const signElement: Record<string, keyof typeof baseScores> = {
  Aries: 'fire',
  Leo: 'fire',
  Sagittarius: 'fire',
  Taurus: 'earth',
  Virgo: 'earth',
  Capricorn: 'earth',
  Gemini: 'air',
  Libra: 'air',
  Aquarius: 'air',
  Cancer: 'water',
  Scorpio: 'water',
  Pisces: 'water',
};

const clampScore = (score: number) => Math.max(50, Math.min(99, score));

export const calculateCompatibility = (signA: string, signB: string) => {
  const elementA = signElement[signA] ?? 'air';
  const elementB = signElement[signB] ?? 'air';
  const base = Math.round((baseScores[elementA] + baseScores[elementB]) / 2);

  const delta = signA === signB ? 8 : elementA === elementB ? 5 : -6;
  const overall = clampScore(base + delta);
  const love = clampScore(overall + 3);
  const communication = clampScore(overall + (elementA === 'air' || elementB === 'air' ? 6 : 0));
  const trust = clampScore(overall + (elementA === 'earth' || elementB === 'earth' ? 5 : -2));
  const passion = clampScore(overall + (elementA === 'fire' || elementB === 'fire' ? 7 : -3));

  return {
    overall,
    love,
    communication,
    trust,
    passion,
  };
};
