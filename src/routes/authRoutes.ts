import { Router } from 'express';
import { z } from 'zod';
import {
  deleteMe,
  forgotPassword,
  login,
  logout,
  me,
  refresh,
  register,
  resetPassword,
  updateMe,
} from '../controllers/authController';
import { loginRateLimiter } from '../middleware/rateLimiters';
import { requireAuth } from '../middleware/auth';
import { validateBody } from '../middleware/validate';

const router = Router();

router.post(
  '/register',
  validateBody(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
      full_name: z.string().min(2),
      birth_date: z.string(),
      birth_time: z.string().optional(),
      birth_city: z.string().min(2),
      birth_country: z.string().min(2),
    }),
  ),
  register,
);

router.post(
  '/login',
  loginRateLimiter,
  validateBody(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  ),
  login,
);

router.post(
  '/refresh',
  validateBody(z.object({ refreshToken: z.string() })),
  refresh,
);

router.post(
  '/logout',
  validateBody(z.object({ refreshToken: z.string() })),
  logout,
);

router.post(
  '/forgot-password',
  validateBody(z.object({ email: z.string().email() })),
  forgotPassword,
);

router.post(
  '/reset-password',
  validateBody(z.object({ token: z.string(), password: z.string().min(8) })),
  resetPassword,
);

router.get('/me', requireAuth, me);
router.patch(
  '/me',
  requireAuth,
  validateBody(
    z
      .object({
        full_name: z.string().min(2).optional(),
        birth_date: z.string().optional(),
        birth_time: z.string().optional(),
        birth_city: z.string().optional(),
        birth_country: z.string().optional(),
        avatar_url: z.string().url().optional(),
      })
      .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field is required',
      }),
  ),
  updateMe,
);
router.delete('/me', requireAuth, deleteMe);

export default router;
