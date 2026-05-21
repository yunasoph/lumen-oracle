import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { getCached, setCached } from '../utils/cache';
import { toUtcStartOfDay } from '../utils/date';

const getPeriodDate = () => toUtcStartOfDay(new Date());

const fetchHoroscope = async (sign: string, period: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
  const date = getPeriodDate();
  return prisma.horoscope.findFirst({
    where: {
      zodiac_sign: sign,
      period_type: period,
      period_date: date,
    },
  });
};

const buildGetHoroscope =
  (periodType: 'daily' | 'weekly' | 'monthly' | 'yearly') =>
  asyncHandler(async (req: Request, res: Response) => {
    const { sign } = req.params as { sign: string };
    const normalized = `${sign.charAt(0).toUpperCase()}${sign.slice(1).toLowerCase()}`;

    const date = getPeriodDate();
    const cacheKey = `horoscope:${periodType}:${normalized}:${date.toISOString()}`;
    const cached = await getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const horoscope = await fetchHoroscope(normalized, periodType);
    if (!horoscope) {
      throw new AppError('Horoscope not found', 404);
    }

    await setCached(cacheKey, horoscope, 60 * 60 * 24);
    return res.json(horoscope);
  });

export const getDailyHoroscope = buildGetHoroscope('daily');
export const getWeeklyHoroscope = buildGetHoroscope('weekly');
export const getMonthlyHoroscope = buildGetHoroscope('monthly');
export const getYearlyHoroscope = buildGetHoroscope('yearly');

export const getDailyAll = asyncHandler(async (_req: Request, res: Response) => {
  const date = getPeriodDate();
  const cacheKey = `horoscope:daily:all:${date.toISOString()}`;
  const cached = await getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const horoscopes = await prisma.horoscope.findMany({
    where: { period_type: 'daily', period_date: date },
    orderBy: { zodiac_sign: 'asc' },
  });

  await setCached(cacheKey, horoscopes, 60 * 60 * 24);
  return res.json(horoscopes);
});
