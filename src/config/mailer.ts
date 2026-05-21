import nodemailer from 'nodemailer';
import { env } from './env';

export const mailer = nodemailer.createTransport({
  host: env.SMTP_HOST,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});
