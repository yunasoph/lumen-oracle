import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { addDays, toUtcStartOfDay } from '../utils/date';

export const listEvents = asyncHandler(async (_req: Request, res: Response) => {
  const start = toUtcStartOfDay(new Date());
  const end = addDays(start, 90);

  const events = await prisma.cosmicEvent.findMany({
    where: { start_date: { gte: start, lte: end } },
    orderBy: { start_date: 'asc' },
  });

  res.json(events);
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = await prisma.cosmicEvent.findUnique({ where: { id: req.params.id } });
  if (!event) {
    throw new AppError('Event not found', 404);
  }
  res.json(event);
});

export const getEventsBySign = asyncHandler(async (req: Request, res: Response) => {
  const sign = `${req.params.sign.charAt(0).toUpperCase()}${req.params.sign.slice(1).toLowerCase()}`;
  const start = toUtcStartOfDay(new Date());
  const end = addDays(start, 90);

  const events = await prisma.cosmicEvent.findMany({
    where: {
      affected_signs: { has: sign },
      start_date: { gte: start, lte: end },
    },
    orderBy: { start_date: 'asc' },
  });

  res.json(events);
});
