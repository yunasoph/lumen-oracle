import { getZodiacSign } from '../../src/utils/zodiac';

describe('getZodiacSign', () => {
  it('returns Aries for March 21', () => {
    const date = new Date(Date.UTC(2024, 2, 21));
    expect(getZodiacSign(date)).toBe('Aries');
  });

  it('returns Capricorn for January 10', () => {
    const date = new Date(Date.UTC(2024, 0, 10));
    expect(getZodiacSign(date)).toBe('Capricorn');
  });
});
