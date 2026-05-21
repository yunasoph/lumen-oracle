import { Request, Response } from 'express';
import { julian, solar } from 'astronomia';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { getZodiacSign } from '../utils/zodiac';

const dominantElementBySign: Record<string, string> = {
  Aries: 'Fire',
  Leo: 'Fire',
  Sagittarius: 'Fire',
  Taurus: 'Earth',
  Virgo: 'Earth',
  Capricorn: 'Earth',
  Gemini: 'Air',
  Libra: 'Air',
  Aquarius: 'Air',
  Cancer: 'Water',
  Scorpio: 'Water',
  Pisces: 'Water',
};

const dominantModalityBySign: Record<string, string> = {
  Aries: 'Cardinal',
  Cancer: 'Cardinal',
  Libra: 'Cardinal',
  Capricorn: 'Cardinal',
  Taurus: 'Fixed',
  Leo: 'Fixed',
  Scorpio: 'Fixed',
  Aquarius: 'Fixed',
  Gemini: 'Mutable',
  Virgo: 'Mutable',
  Sagittarius: 'Mutable',
  Pisces: 'Mutable',
};

const buildChartData = (birthDate: Date) => {
  const year = birthDate.getUTCFullYear();
  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();
  const jd = julian.CalendarGregorianToJD(year, month, day);
  const sunLongitude = solar.apparentLongitude(jd);

  return {
    sun: {
      longitude: sunLongitude,
      sign: getZodiacSign(birthDate),
    },
    generatedAt: new Date().toISOString(),
  };
};

export const generateChart = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const { birth_date, birth_time, birth_city, birth_country } = req.body as {
    birth_date: string;
    birth_time?: string;
    birth_city: string;
    birth_country: string;
  };

  const date = new Date(birth_date);
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Invalid birth_date', 422);
  }

  if (birth_time) {
    const normalized = birth_time.includes('T') ? birth_time : `1970-01-01T${birth_time}Z`;
    const time = new Date(normalized);
    if (!Number.isNaN(time.getTime())) {
      date.setUTCHours(time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds());
    }
  }

  const chartData = buildChartData(date);
  const sunSign = chartData.sun.sign;

  const chart = await prisma.birthChart.create({
    data: {
      user_id: req.user.id,
      chart_data: chartData,
      houses: { overview: 'Placeholder houses chart' },
      aspects: { overview: 'Placeholder aspects chart' },
      dominant_element: dominantElementBySign[sunSign] ?? 'Air',
      dominant_modality: dominantModalityBySign[sunSign] ?? 'Mutable',
      chart_svg_url: null,
    },
  });

  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      birth_date: date,
      birth_time: birth_time ? new Date(`1970-01-01T${birth_time}Z`) : req.user.birth_time,
      birth_city,
      birth_country,
    },
  });

  if (redis.isOpen) {
    await redis.set(`birth_chart:${req.user.id}`, JSON.stringify(chart), { EX: 60 * 60 * 24 });
  }

  res.status(201).json(chart);
});

export const getMyChart = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  if (redis.isOpen) {
    const cached = await redis.get(`birth_chart:${req.user.id}`);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
  }

  const chart = await prisma.birthChart.findFirst({
    where: { user_id: req.user.id },
    orderBy: { generated_at: 'desc' },
  });

  if (!chart) {
    throw new AppError('Birth chart not found', 404);
  }

  if (redis.isOpen) {
    await redis.set(`birth_chart:${req.user.id}`, JSON.stringify(chart), { EX: 60 * 60 * 24 });
  }

  res.json(chart);
});
