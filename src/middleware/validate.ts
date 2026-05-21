import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
  schema.parse(req.body);
  return next();
};
