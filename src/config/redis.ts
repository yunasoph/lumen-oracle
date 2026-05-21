import { createClient } from 'redis';
import { env } from './env';
import { logger } from '../utils/logger';

export const redis = createClient({ url: env.REDIS_URL });

redis.on('error', (error) => {
  logger.error('Redis error', { error });
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export const disconnectRedis = async () => {
  if (redis.isOpen) {
    await redis.disconnect();
  }
};
