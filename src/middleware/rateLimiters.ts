import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';
import { getUserPlan } from '../services/subscriptionService';
import { AppError } from '../utils/appError';

const buildRedisStore = () => {
  if (!redis.isOpen || process.env.NODE_ENV === 'test') {
    return undefined;
  }
  return new RedisStore({
    sendCommand: (...args: string[]) => redis.sendCommand(args),
  });
};

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  store: buildRedisStore(),
  message: { message: 'Too many login attempts. Try again later.' },
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: buildRedisStore(),
  message: { message: 'Too many requests. Please slow down.' },
});

const memoryCounts = new Map<string, { count: number; expiresAt: number }>();

const getTarotLimit = (plan: string) => {
  if (plan === 'cosmic') {
    return Infinity;
  }
  if (plan === 'oracle') {
    return 20;
  }
  return 3;
};

export const tarotRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plan = req.user ? await getUserPlan(req.user.id) : 'free';
    const limit = getTarotLimit(plan);
    if (!Number.isFinite(limit)) {
      return next();
    }

    const identifier = req.user?.id ?? req.ip;
    const today = new Date();
    const dayKey = `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
    const key = `tarot:limit:${identifier}:${dayKey}`;

    let count = 0;
    if (redis.isOpen) {
      count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, 60 * 60 * 24);
      }
    } else {
      const entry = memoryCounts.get(key);
      const now = Date.now();
      if (!entry || entry.expiresAt < now) {
        memoryCounts.set(key, { count: 1, expiresAt: now + 24 * 60 * 60 * 1000 });
        count = 1;
      } else {
        entry.count += 1;
        count = entry.count;
      }
    }

    res.setHeader('X-RateLimit-Limit', limit.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(limit - count, 0).toString());

    if (count > limit) {
      return next(new AppError('Daily tarot draw limit reached', 429));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
