import { Router } from 'express';
import { z } from 'zod';
import { createEntry, deleteEntry, listEntries, updateEntry } from '../controllers/journalController';
import { requireAuth } from '../middleware/auth';
import { apiRateLimiter } from '../middleware/rateLimiters';
import { validateBody } from '../middleware/validate';

const router = Router();

router.use(apiRateLimiter);

router.get('/', requireAuth, listEntries);
router.post(
  '/',
  requireAuth,
  validateBody(
    z.object({
      title: z.string().min(2),
      content: z.string().min(2),
      mood: z.enum(['radiant', 'reflective', 'turbulent', 'grounded', 'expansive']),
      moon_phase_id: z.number().optional(),
      tags: z.array(z.string()).optional(),
    }),
  ),
  createEntry,
);
router.patch(
  '/:id',
  requireAuth,
  validateBody(
    z.object({
      title: z.string().min(2).optional(),
      content: z.string().min(2).optional(),
      mood: z.enum(['radiant', 'reflective', 'turbulent', 'grounded', 'expansive']).optional(),
      tags: z.array(z.string()).optional(),
    }),
  ),
  updateEntry,
);
router.delete('/:id', requireAuth, deleteEntry);

export default router;
