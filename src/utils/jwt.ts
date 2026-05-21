import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '15m' });

export const signRefreshToken = (userId: string, tokenId: string) =>
  jwt.sign({ sub: userId, jti: tokenId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) => jwt.verify(token, env.JWT_SECRET);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
