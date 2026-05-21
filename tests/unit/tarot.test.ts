import { drawTarotCards, getSpreadSize } from '../../src/utils/tarot';

describe('tarot utilities', () => {
  it('returns correct spread sizes', () => {
    expect(getSpreadSize('single')).toBe(1);
    expect(getSpreadSize('three_card')).toBe(3);
    expect(getSpreadSize('celtic_cross')).toBe(10);
  });

  it('draws unique cards', () => {
    const cards = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Card ${index + 1}`,
    })) as any[];

    const drawn = drawTarotCards(cards, 3);
    const ids = new Set(drawn.map((card) => card.id));
    expect(drawn).toHaveLength(3);
    expect(ids.size).toBe(3);
  });
});
