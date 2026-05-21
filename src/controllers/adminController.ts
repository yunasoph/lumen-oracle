import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';

type HoroscopeEntryInput = {
  zodiac_sign: string;
  period_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  period_date: string | Date;
  theme: string;
  content: string;
  lucky_number?: number;
  lucky_color?: string;
  energy_rating?: number;
  compatibility_sign?: string;
};

export const upsertHoroscopes = asyncHandler(async (req: Request, res: Response) => {
  const { entries } = req.body as { entries: HoroscopeEntryInput[] };
  if (!Array.isArray(entries)) {
    return res.status(422).json({ message: 'Entries must be an array' });
  }

  const normalized: HoroscopeEntryInput[] = entries.map((entry) => ({
    ...entry,
    period_date: new Date(entry.period_date as string),
  }));

  await prisma.$transaction(
    normalized.map((entry) =>
      prisma.horoscope.deleteMany({
        where: {
          zodiac_sign: entry.zodiac_sign as string,
          period_type: entry.period_type as 'daily' | 'weekly' | 'monthly' | 'yearly',
          period_date: entry.period_date as Date,
        },
      }),
    ),
  );

  const created = await prisma.horoscope.createMany({
    data: normalized as never[],
    skipDuplicates: true,
  });
  res.json({ created: created.count });
});

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 20);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    }),
    prisma.user.count(),
  ]);

  res.json({ users, page, total, totalPages: Math.ceil(total / limit) });
});

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const [users, subscriptions, readings, charts] = await Promise.all([
    prisma.user.count(),
    prisma.userSubscription.count({ where: { status: 'active' } }),
    prisma.tarotReading.count(),
    prisma.birthChart.count(),
  ]);

  res.json({ users, activeSubscriptions: subscriptions, tarotReadings: readings, birthCharts: charts });
});
