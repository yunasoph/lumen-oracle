import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().optional().default('development'),
  PORT: z.coerce.number().optional().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),
  STRIPE_PRICE_ORACLE: z.string().optional(),
  STRIPE_PRICE_COSMIC: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
  ANTHROPIC_API_KEY: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_USER: z.string().min(1, 'SMTP_USER is required'),
  SMTP_PASS: z.string().min(1, 'SMTP_PASS is required'),
  CLIENT_URL: z.string().min(1, 'CLIENT_URL is required'),
  ADMIN_EMAILS: z.string().optional().default(''),
});

export const env = envSchema.parse(process.env);
