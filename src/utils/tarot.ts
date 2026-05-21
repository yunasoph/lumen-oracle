import { TarotCard, TarotSpreadType } from '@prisma/client';

const spreadSizes: Record<TarotSpreadType, number> = {
  single: 1,
  three_card: 3,
  celtic_cross: 10,
};

export const getSpreadSize = (spread: TarotSpreadType) => spreadSizes[spread] ?? 1;

export const drawTarotCards = (cards: TarotCard[], count: number) => {
  if (count > cards.length) {
    throw new Error('Not enough cards to draw from');
  }

  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};
