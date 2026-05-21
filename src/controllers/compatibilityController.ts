import { Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { asyncHandler } from '../utils/asyncHandler';
import { calculateCompatibility } from '../utils/compatibility';

const normalizeSign = (sign: string) => `${sign.charAt(0).toUpperCase()}${sign.slice(1).toLowerCase()}`;

export const checkCompatibility = asyncHandler(async (req: Request, res: Response) => {
  const { sign_a, sign_b } = req.body as { sign_a: string; sign_b: string };
  const signA = normalizeSign(sign_a);
  const signB = normalizeSign(sign_b);

  const existing = await prisma.compatibilityReport.findFirst({
    where: {
      OR: [
        { sign_a: signA, sign_b: signB },
        { sign_a: signB, sign_b: signA },
      ],
    },
  });

  if (existing) {
    return res.json(existing);
  }

  const scores = calculateCompatibility(signA, signB);
  const reportText = `${signA} and ${signB} share a soulful thread of connection. The relationship thrives when both honor each other's elemental rhythm.`;

  const report = await prisma.compatibilityReport.create({
    data: {
      requester_user_id: req.user?.id,
      sign_a: signA,
      sign_b: signB,
      overall_score: scores.overall,
      love_score: scores.love,
      communication_score: scores.communication,
      trust_score: scores.trust,
      passion_score: scores.passion,
      report_text: reportText,
    },
  });

  return res.json(report);
});
