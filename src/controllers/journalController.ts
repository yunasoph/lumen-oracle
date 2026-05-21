import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';

export const listEntries = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);
  const skip = (page - 1) * limit;

  const [entries, total] = await Promise.all([
    prisma.userJournalEntry.findMany({
      where: { user_id: req.user.id },
      orderBy: { created_at: 'desc' },
      skip,
      take: limit,
    }),
    prisma.userJournalEntry.count({ where: { user_id: req.user.id } }),
  ]);

  res.json({ entries, page, total, totalPages: Math.ceil(total / limit) });
});

export const createEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const { title, content, mood, moon_phase_id, tags } = req.body as {
    title: string;
    content: string;
    mood: string;
    moon_phase_id?: number;
    tags?: string[];
  };

  const entry = await prisma.userJournalEntry.create({
    data: {
      user_id: req.user.id,
      title,
      content,
      mood,
      moon_phase_id,
      tags,
    },
  });

  res.status(201).json(entry);
});

export const updateEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const entry = await prisma.userJournalEntry.findUnique({ where: { id: req.params.id } });
  if (!entry || entry.user_id !== req.user.id) {
    throw new AppError('Entry not found', 404);
  }

  const { title, content, mood, tags } = req.body as {
    title?: string;
    content?: string;
    mood?: string;
    tags?: string[];
  };

  const updated = await prisma.userJournalEntry.update({
    where: { id: req.params.id },
    data: {
      title,
      content,
      mood,
      tags,
    },
  });

  res.json(updated);
});

export const deleteEntry = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const entry = await prisma.userJournalEntry.findUnique({ where: { id: req.params.id } });
  if (!entry || entry.user_id !== req.user.id) {
    throw new AppError('Entry not found', 404);
  }

  await prisma.userJournalEntry.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
