import { Router } from 'express';
import { z } from 'zod';
import {
  cancelSubscription,
  createCheckout,
  createPortal,
  getStatus,
  handleWebhook,
} from '../controllers/subscriptionController';
import { requireAuth } from '../middleware/auth';
import { apiRateLimiter } from '../middleware/rateLimiters';
import { validateBody } from '../middleware/validate';

const router = Router();

router.post(
  '/checkout',
  apiRateLimiter,
  requireAuth,
  validateBody(z.object({ plan: z.enum(['oracle', 'cosmic']) })),
  createCheckout,
);
router.post('/webhook', handleWebhook);

router.use(apiRateLimiter);
router.get('/status', requireAuth, getStatus);
router.post('/cancel', requireAuth, cancelSubscription);
router.post('/portal', requireAuth, createPortal);

export default router;
