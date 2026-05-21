const zodiacRanges = [
  { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
  { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
  { sign: 'Pisces', start: [2, 19], end: [3, 20] },
  { sign: 'Aries', start: [3, 21], end: [4, 19] },
  { sign: 'Taurus', start: [4, 20], end: [5, 20] },
  { sign: 'Gemini', start: [5, 21], end: [6, 20] },
  { sign: 'Cancer', start: [6, 21], end: [7, 22] },
  { sign: 'Leo', start: [7, 23], end: [8, 22] },
  { sign: 'Virgo', start: [8, 23], end: [9, 22] },
  { sign: 'Libra', start: [9, 23], end: [10, 22] },
  { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
  { sign: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

export const getZodiacSign = (date: Date) => {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  const match = zodiacRanges.find(({ start, end }) => {
    const [startMonth, startDay] = start;
    const [endMonth, endDay] = end;

    if (startMonth === endMonth) {
      return month === startMonth && day >= startDay && day <= endDay;
    }

    if (month === startMonth && day >= startDay) {
      return true;
    }

    return month === endMonth && day <= endDay;
  });

  return match ? match.sign : 'Capricorn';
};
