type RedisValue = {
  value: string;
  expiresAt?: number;
};

export const createRedisMock = () => {
  const store = new Map<string, RedisValue>();

  const getValue = (key: string) => {
    const entry = store.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      store.delete(key);
      return null;
    }
    return entry.value;
  };

  const setValue = (key: string, value: string, ttlSeconds?: number) => {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    store.set(key, { value, expiresAt });
  };

  return {
    isOpen: true,
    get: jest.fn(async (key: string) => getValue(key)),
    set: jest.fn(async (key: string, value: string, options?: { EX?: number }) => {
      setValue(key, value, options?.EX);
      return 'OK';
    }),
    del: jest.fn(async (key: string) => {
      store.delete(key);
      return 1;
    }),
    incr: jest.fn(async (key: string) => {
      const current = Number(getValue(key) ?? 0) + 1;
      setValue(key, current.toString());
      return current;
    }),
    expire: jest.fn(async (key: string, seconds: number) => {
      const value = getValue(key);
      if (value) {
        setValue(key, value, seconds);
      }
      return 1;
    }),
    sendCommand: jest.fn(async (args: string[]) => {
      const command = args[0]?.toLowerCase();
      const key = args[1];
      if (!key) return null;
      switch (command) {
        case 'get':
          return getValue(key);
        case 'set':
          setValue(key, args[2] ?? '');
          return 'OK';
        case 'incr': {
          const current = Number(getValue(key) ?? 0) + 1;
          setValue(key, current.toString());
          return current;
        }
        case 'pexpire': {
          const ttlMs = Number(args[2] ?? 0);
          if (!Number.isNaN(ttlMs)) {
            const value = getValue(key);
            if (value) {
              store.set(key, { value, expiresAt: Date.now() + ttlMs });
            }
          }
          return 1;
        }
        default:
          return null;
      }
    }),
  };
};
