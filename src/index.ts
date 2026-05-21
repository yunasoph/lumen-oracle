import { app } from './app';
import { env } from './config/env';
import { connectRedis, disconnectRedis } from './config/redis';
import { prisma } from './config/prisma';
import { logger } from './utils/logger';

const start = async () => {
  await connectRedis();

  const server = app.listen(env.PORT, () => {
    logger.info(`Lumen Oracle API running on port ${env.PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await disconnectRedis();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

start().catch((error) => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});
