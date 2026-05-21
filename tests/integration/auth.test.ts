import request from 'supertest';
import { createPrismaMock } from '../mocks/prisma';
import { createRedisMock } from '../mocks/redis';

jest.mock('../../src/config/prisma', () => ({ prisma: createPrismaMock() }));
jest.mock('../../src/config/redis', () => {
  const redis = createRedisMock();
  return { redis, connectRedis: jest.fn(), disconnectRedis: jest.fn() };
});
jest.mock('../../src/middleware/rateLimiters', () => ({
  loginRateLimiter: (_req: any, _res: any, next: any) => next(),
  apiRateLimiter: (_req: any, _res: any, next: any) => next(),
  tarotRateLimiter: (_req: any, _res: any, next: any) => next(),
}));

import { prisma } from '../../src/config/prisma';
import { app } from '../../src/app';

describe('auth flow', () => {
  const userStore: Record<string, any> = {};

  beforeEach(() => {
    (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }: any) => {
      if (where.email) {
        return Object.values(userStore).find((user) => user.email === where.email) ?? null;
      }
      if (where.id) {
        return userStore[where.id] ?? null;
      }
      return null;
    });

    (prisma.user.create as jest.Mock).mockImplementation(({ data }: any) => {
      const user = { id: 'user-1', ...data, created_at: new Date(), updated_at: new Date() };
      userStore[user.id] = user;
      return user;
    });

    (prisma.user.update as jest.Mock).mockImplementation(({ where, data }: any) => {
      const user = { ...(userStore[where.id] ?? {}), ...data };
      userStore[where.id] = user;
      return user;
    });
  });

  it('registers, logs in, refreshes, and fetches profile', async () => {
    const register = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User',
      birth_date: '1991-04-12',
      birth_city: 'Paris',
      birth_country: 'France',
    });

    expect(register.status).toBe(201);
    expect(register.body.user.email).toBe('test@example.com');

    const login = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(login.status).toBe(200);
    expect(login.body.accessToken).toBeDefined();

    const refresh = await request(app).post('/api/auth/refresh').send({
      refreshToken: login.body.refreshToken,
    });

    expect(refresh.status).toBe(200);
    expect(refresh.body.accessToken).toBeDefined();

    const profile = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${login.body.accessToken}`);

    expect(profile.status).toBe(200);
    expect(profile.body.user.email).toBe('test@example.com');
  });
});
