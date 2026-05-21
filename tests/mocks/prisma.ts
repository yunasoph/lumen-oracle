export const createPrismaMock = () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
  horoscope: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    createMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  tarotCard: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    deleteMany: jest.fn(),
  },
  tarotReading: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    count: jest.fn(),
  },
  birthChart: {
    create: jest.fn(),
    findFirst: jest.fn(),
    count: jest.fn(),
  },
  moonPhase: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  cosmicEvent: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    deleteMany: jest.fn(),
  },
  userJournalEntry: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  userSubscription: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    count: jest.fn(),
  },
  compatibilityReport: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
  $transaction: jest.fn(),
});
