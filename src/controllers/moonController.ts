import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { getCached, setCached } from '../utils/cache';
import { addDays, toUtcStartOfDay } from '../utils/date';
import { AppError } from '../utils/appError';

export const getCurrentMoon = asyncHandler(async (_req: Request, res: Response) => {
  const today = toUtcStartOfDay(new Date());
  const cacheKey = `moon:current:${today.toISOString()}`;
  const cached = await getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const phase = await prisma.moonPhase.findFirst({
    where: { phase_date: today },
  });
  if (!phase) {
    throw new AppError('Moon phase not found', 404);
  }

  await setCached(cacheKey, phase, 60 * 60 * 24 * 7);
  res.json(phase);
});

export const getUpcomingMoon = asyncHandler(async (_req: Request, res: Response) => {
  const start = toUtcStartOfDay(new Date());
  const end = addDays(start, 30);
  const cacheKey = `moon:upcoming:${start.toISOString()}`;
  const cached = await getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const phases = await prisma.moonPhase.findMany({
    where: { phase_date: { gte: start, lte: end } },
    orderBy: { phase_date: 'asc' },
  });
  await setCached(cacheKey, phases, 60 * 60 * 24 * 7);
  res.json(phases);
});

export const getMoonCalendar = asyncHandler(async (req: Request, res: Response) => {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  if (!year || !month || month < 1 || month > 12) {
    throw new AppError('Invalid year or month', 400);
  }

  const cacheKey = `moon:calendar:${year}-${month}`;
  const cached = await getCached(cacheKey);
  if (cached) {
    return res.json(cached);
  }

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0));

  const phases = await prisma.moonPhase.findMany({
    where: { phase_date: { gte: start, lte: end } },
    orderBy: { phase_date: 'asc' },
  });

  await setCached(cacheKey, phases, 60 * 60 * 24 * 7);
  res.json(phases);
});
