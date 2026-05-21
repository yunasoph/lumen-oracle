import { Request, Response } from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { drawTarotCards, getSpreadSize } from '../utils/tarot';

const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

const systemPrompt =
  "You are Lumina, an ancient and wise oracle of Lumen Oracle. You interpret tarot cards with poetic depth, psychological insight, and mystical wisdom. Your interpretations are personal, empowering, and beautifully written. Never be generic. Speak as if you see directly into the querent's soul.";

const spreadPositions: Record<string, string[]> = {
  single: ['Focus'],
  three_card: ['Past', 'Present', 'Future'],
  celtic_cross: [
    'Present',
    'Challenge',
    'Past',
    'Future',
    'Above',
    'Below',
    'Advice',
    'External Influences',
    'Hopes & Fears',
    'Outcome',
  ],
};

const buildPrompt = (cards: { name: string }[], spreadType: string, question?: string) => {
  const positions = spreadPositions[spreadType] ?? [];
  const cardLines = cards
    .map((card, index) => {
      const position = positions[index] ?? `Position ${index + 1}`;
      return `${position}: ${card.name}`;
    })
    .join('\n');

  return `Question: ${question ?? 'No question provided'}\nSpread: ${spreadType}\nCards:\n${cardLines}\n\nProvide a detailed interpretation.`;
};

const generateInterpretation = async (cards: { name: string }[], spreadType: string, question?: string) => {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 800,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: buildPrompt(cards, spreadType, question),
      },
    ],
  });

  const content = message.content?.[0];
  if (!content || content.type !== 'text') {
    throw new AppError('Failed to generate interpretation', 502);
  }
  return content.text;
};

export const listCards = asyncHandler(async (_req: Request, res: Response) => {
  const cards = await prisma.tarotCard.findMany({ orderBy: { id: 'asc' } });
  res.json(cards);
});

export const getCard = asyncHandler(async (req: Request, res: Response) => {
  const card = await prisma.tarotCard.findUnique({ where: { id: Number(req.params.id) } });
  if (!card) {
    throw new AppError('Card not found', 404);
  }
  res.json(card);
});

export const drawCards = asyncHandler(async (req: Request, res: Response) => {
  const { spread_type, question } = req.body as { spread_type: string; question?: string };
  const spreadType = spread_type as 'single' | 'three_card' | 'celtic_cross';
  const cards = await prisma.tarotCard.findMany();
  const count = getSpreadSize(spreadType);

  if (!cards.length) {
    throw new AppError('No tarot cards available', 404);
  }

  const drawn = drawTarotCards(cards, count);
  const interpretation = await generateInterpretation(drawn, spreadType, question);

  const reading = await prisma.tarotReading.create({
    data: {
      user_id: req.user?.id,
      spread_type: spreadType,
      question,
      cards_drawn: drawn,
      interpretation,
      session_token: req.user ? null : req.headers['x-session-token']?.toString() ?? null,
    },
  });

  res.status(201).json({ cards: drawn, interpretation, reading_id: reading.id });
});

export const listReadings = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const readings = await prisma.tarotReading.findMany({
    where: { user_id: req.user.id },
    orderBy: { created_at: 'desc' },
  });
  res.json(readings);
});

export const getReading = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const reading = await prisma.tarotReading.findUnique({ where: { id: req.params.id } });
  if (!reading || reading.user_id !== req.user.id) {
    throw new AppError('Reading not found', 404);
  }

  res.json(reading);
});
