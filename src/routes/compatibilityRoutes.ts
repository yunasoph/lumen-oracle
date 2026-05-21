import { Router } from 'express';
import { z } from 'zod';
import { checkCompatibility } from '../controllers/compatibilityController';
import { optionalAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';

const router = Router();

router.post(
  '/check',
  optionalAuth,
  validateBody(z.object({ sign_a: z.string().min(2), sign_b: z.string().min(2) })),
  checkCompatibility,
);

export default router;
