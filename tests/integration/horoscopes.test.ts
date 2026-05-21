import request from 'supertest';
import { createPrismaMock } from '../mocks/prisma';
import { createRedisMock } from '../mocks/redis';

jest.mock('../../src/config/prisma', () => ({ prisma: createPrismaMock() }));
jest.mock('../../src/config/redis', () => {
  const redis = createRedisMock();
  return { redis, connectRedis: jest.fn(), disconnectRedis: jest.fn() };
});

import { prisma } from '../../src/config/prisma';
import { app } from '../../src/app';

describe('horoscope endpoints', () => {
  beforeEach(() => {
    (prisma.horoscope.findFirst as jest.Mock).mockResolvedValue({
      id: 'horo-1',
      zodiac_sign: 'Aries',
      period_type: 'daily',
      period_date: new Date(),
      theme: 'Love',
      content: 'A radiant day.',
    });

    (prisma.horoscope.findMany as jest.Mock).mockResolvedValue([
      { id: 'horo-1', zodiac_sign: 'Aries' },
      { id: 'horo-2', zodiac_sign: 'Taurus' },
    ]);
  });

  it('returns daily horoscope for a sign', async () => {
    const response = await request(app).get('/api/horoscopes/daily/aries');
    expect(response.status).toBe(200);
    expect(response.body.zodiac_sign).toBe('Aries');
  });

  it('returns all daily horoscopes', async () => {
    const response = await request(app).get('/api/horoscopes/today/all');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
