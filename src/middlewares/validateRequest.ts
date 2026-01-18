import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../constants/httpStatus';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};
