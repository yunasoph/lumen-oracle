import { redis } from '../config/redis';

export const getCached = async <T>(key: string): Promise<T | null> => {
  if (!redis.isOpen) {
    return null;
  }

  const value = await redis.get(key);
  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
};

export const setCached = async <T>(key: string, value: T, ttlSeconds: number) => {
  if (!redis.isOpen) {
    return;
  }

  await redis.set(key, JSON.stringify(value), {
    EX: ttlSeconds,
  });
};
