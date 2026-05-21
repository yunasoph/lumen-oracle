import { Router } from 'express';
import { z } from 'zod';
import { getStats, listUsers, upsertHoroscopes } from '../controllers/adminController';
import { requireAdmin, requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';

const router = Router();

router.post(
  '/horoscopes',
  requireAuth,
  requireAdmin,
  validateBody(
    z.object({
      entries: z.array(
        z.object({
          zodiac_sign: z.string(),
          period_type: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
          period_date: z.string(),
          theme: z.string(),
          content: z.string(),
          lucky_number: z.number().optional(),
          lucky_color: z.string().optional(),
          energy_rating: z.number().optional(),
          compatibility_sign: z.string().optional(),
        }),
      ),
    }),
  ),
  upsertHoroscopes,
);
router.get('/users', requireAuth, requireAdmin, listUsers);
router.get('/stats', requireAuth, requireAdmin, getStats);

export default router;
