import { Router } from 'express';
import { z } from 'zod';
import { generateChart, getMyChart } from '../controllers/chartController';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';

const router = Router();

router.post(
  '/generate',
  requireAuth,
  validateBody(
    z.object({
      birth_date: z.string(),
      birth_time: z.string().optional(),
      birth_city: z.string(),
      birth_country: z.string(),
    }),
  ),
  generateChart,
);

router.get('/my-chart', requireAuth, getMyChart);

export default router;
