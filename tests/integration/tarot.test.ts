import request from 'supertest';
import { createPrismaMock } from '../mocks/prisma';
import { createRedisMock } from '../mocks/redis';

jest.mock('@anthropic-ai/sdk', () => {
  return {
    __esModule: true,
    default: class AnthropicMock {
      messages = {
        create: jest.fn().mockResolvedValue({
          content: [{ type: 'text', text: 'Mock interpretation' }],
        }),
      };
    },
  };
});

jest.mock('../../src/config/prisma', () => ({ prisma: createPrismaMock() }));
jest.mock('../../src/config/redis', () => {
  const redis = createRedisMock();
  return { redis, connectRedis: jest.fn(), disconnectRedis: jest.fn() };
});

import { prisma } from '../../src/config/prisma';
import { app } from '../../src/app';

describe('tarot draw endpoint', () => {
  beforeEach(() => {
    (prisma.tarotCard.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: 'The Fool' },
      { id: 2, name: 'The Magician' },
      { id: 3, name: 'The High Priestess' },
    ]);

    (prisma.tarotReading.create as jest.Mock).mockResolvedValue({
      id: 'reading-1',
    });
  });

  it('draws cards and returns interpretation', async () => {
    const response = await request(app).post('/api/tarot/draw').send({
      spread_type: 'single',
      question: 'What do I need to know?',
    });

    expect(response.status).toBe(201);
    expect(response.body.cards).toHaveLength(1);
    expect(response.body.interpretation).toBe('Mock interpretation');
  });
});
