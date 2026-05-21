import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';
import { env } from '../config/env';
import { AppError } from '../utils/appError';
import { verifyAccessToken } from '../utils/jwt';

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized', 401));
  }

  try {
    const token = header.split(' ')[1];
    const payload = verifyAccessToken(token) as { sub?: string };
    if (!payload.sub) {
      throw new Error('Invalid token');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.password_hash) {
      return next(new AppError('Unauthorized', 401));
    }

    req.user = user;
    return next();
  } catch {
    return next(new AppError('Unauthorized', 401));
  }
};

export const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next();
  }

  try {
    const token = header.split(' ')[1];
    const payload = verifyAccessToken(token) as { sub?: string };
    if (!payload.sub) {
      return next();
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (user && user.password_hash) {
      req.user = user;
    }
  } catch {
    return next();
  }

  return next();
};

export const requireAdmin = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', 401));
  }

  const admins = env.ADMIN_EMAILS.split(',').map((email) => email.trim()).filter(Boolean);
  if (admins.length === 0) {
    return next(new AppError('Forbidden', 403));
  }

  if (!admins.includes(req.user.email)) {
    return next(new AppError('Forbidden', 403));
  }

  return next();
};
