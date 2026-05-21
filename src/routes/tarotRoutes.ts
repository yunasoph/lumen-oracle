import { Router } from 'express';
import { z } from 'zod';
import { drawCards, getCard, getReading, listCards, listReadings } from '../controllers/tarotController';
import { optionalAuth, requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';
import { apiRateLimiter, tarotRateLimiter } from '../middleware/rateLimiters';

const router = Router();

router.use(apiRateLimiter);

router.get('/cards', listCards);
router.get('/cards/:id', getCard);

router.post(
  '/draw',
  optionalAuth,
  tarotRateLimiter,
  validateBody(
    z.object({
      spread_type: z.enum(['single', 'three_card', 'celtic_cross']),
      question: z.string().optional(),
    }),
  ),
  drawCards,
);

router.get('/readings', requireAuth, listReadings);
router.get('/readings/:id', requireAuth, getReading);

export default router;
