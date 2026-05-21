import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { mailer } from '../config/mailer';
import { env } from '../config/env';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/appError';
import { getZodiacSign } from '../utils/zodiac';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';

const parseBirthTime = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const normalized = value.includes('T') ? value : `1970-01-01T${value}Z`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Invalid birth_time', 422);
  }
  return date;
};

const storeRefreshToken = async (tokenId: string, userId: string) => {
  if (!redis.isOpen) {
    return;
  }

  await redis.set(`refresh:${tokenId}`, userId, {
    EX: 7 * 24 * 60 * 60,
  });
};

const revokeRefreshToken = async (tokenId: string) => {
  if (!redis.isOpen) {
    return;
  }

  await redis.del(`refresh:${tokenId}`);
};

const verifyRefreshTokenStored = async (tokenId: string) => {
  if (!redis.isOpen) {
    return false;
  }

  const value = await redis.get(`refresh:${tokenId}`);
  return Boolean(value);
};

const buildAuthResponse = async (userId: string) => {
  const tokenId = uuidv4();
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId, tokenId);
  await storeRefreshToken(tokenId, userId);
  return { accessToken, refreshToken };
};

const sanitizeUser = (user: { password_hash: string | null }) => {
  const { password_hash: _password, ...rest } = user;
  return rest;
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, full_name, birth_date, birth_time, birth_city, birth_country } = req.body as {
    email: string;
    password: string;
    full_name: string;
    birth_date: string;
    birth_time?: string;
    birth_city: string;
    birth_country: string;
  };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const birthDate = new Date(birth_date);
  if (Number.isNaN(birthDate.getTime())) {
    throw new AppError('Invalid birth_date', 422);
  }

  const user = await prisma.user.create({
    data: {
      email,
      password_hash: await hashPassword(password),
      full_name,
      birth_date: birthDate,
      birth_time: parseBirthTime(birth_time),
      birth_city,
      birth_country,
      sun_sign: getZodiacSign(birthDate),
    },
  });

  const tokens = await buildAuthResponse(user.id);
  res.status(201).json({ user: sanitizeUser(user), ...tokens });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password_hash) {
    throw new AppError('Invalid credentials', 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    throw new AppError('Invalid credentials', 401);
  }

  const tokens = await buildAuthResponse(user.id);
  res.json({ user: sanitizeUser(user), ...tokens });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken: string };
  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  const payload = verifyRefreshToken(refreshToken);
  if (!payload?.sub || !payload.jti) {
    throw new AppError('Invalid refresh token', 401);
  }

  const exists = await verifyRefreshTokenStored(payload.jti);
  if (!exists) {
    throw new AppError('Refresh token expired', 401);
  }

  const accessToken = signAccessToken(payload.sub);
  res.json({ accessToken });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body as { refreshToken: string };
  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  const payload = verifyRefreshToken(refreshToken);
  if (payload?.jti) {
    await revokeRefreshToken(payload.jti);
  }

  res.status(204).send();
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body as { email: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(204).send();
  }

  const token = uuidv4();
  if (redis.isOpen) {
    await redis.set(`reset:${token}`, user.id, { EX: 60 * 60 });
  }

  const resetUrl = `${env.CLIENT_URL}/reset-password?token=${token}`;
  await mailer.sendMail({
    from: `Lumen Oracle <${env.SMTP_USER}>`,
    to: email,
    subject: 'Reset your Lumen Oracle password',
    text: `Reset your password: ${resetUrl}`,
  });

  res.status(204).send();
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body as { token: string; password: string };
  if (!token || !password) {
    throw new AppError('Token and password required', 400);
  }

  if (!redis.isOpen) {
    throw new AppError('Password reset unavailable', 503);
  }

  const userId = await redis.get(`reset:${token}`);
  if (!userId) {
    throw new AppError('Invalid or expired token', 400);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { password_hash: await hashPassword(password) },
  });
  await redis.del(`reset:${token}`);

  res.status(204).send();
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }
  res.json({ user: sanitizeUser(req.user) });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const { full_name, birth_date, birth_time, birth_city, birth_country, avatar_url } = req.body as {
    full_name?: string;
    birth_date?: string;
    birth_time?: string;
    birth_city?: string;
    birth_country?: string;
    avatar_url?: string;
  };

  const data: Record<string, unknown> = {};
  if (full_name !== undefined) data.full_name = full_name;
  if (birth_city !== undefined) data.birth_city = birth_city;
  if (birth_country !== undefined) data.birth_country = birth_country;
  if (avatar_url !== undefined) data.avatar_url = avatar_url;

  let birthDateUpdated = false;
  if (birth_date) {
    const date = new Date(birth_date);
    if (Number.isNaN(date.getTime())) {
      throw new AppError('Invalid birth_date', 422);
    }
    data.birth_date = date;
    data.sun_sign = getZodiacSign(date);
    birthDateUpdated = true;
  }

  if (birth_time !== undefined) {
    data.birth_time = parseBirthTime(birth_time);
    birthDateUpdated = true;
  }

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data,
  });

  if (birthDateUpdated && redis.isOpen) {
    await redis.del(`birth_chart:${req.user.id}`);
  }

  res.json({ user: sanitizeUser(user) });
});

export const deleteMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Unauthorized', 401);
  }

  const obfuscatedEmail = `deleted+${uuidv4()}@lumen-oracle.local`;
  await prisma.user.update({
    where: { id: req.user.id },
    data: {
      email: obfuscatedEmail,
      username: null,
      password_hash: null,
      full_name: null,
      birth_date: null,
      birth_time: null,
      birth_city: null,
      birth_country: null,
      birth_latitude: null,
      birth_longitude: null,
      sun_sign: 'Unknown',
      moon_sign: null,
      rising_sign: null,
      avatar_url: null,
      is_premium: false,
    },
  });

  res.status(204).send();
});
