import { calculateCompatibility } from '../../src/utils/compatibility';

describe('calculateCompatibility', () => {
  it('returns bounded scores', () => {
    const result = calculateCompatibility('Aries', 'Libra');
    expect(result.overall).toBeGreaterThanOrEqual(50);
    expect(result.overall).toBeLessThanOrEqual(99);
  });
});
