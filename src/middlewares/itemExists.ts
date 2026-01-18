import { Request, Response, NextFunction } from 'express';
import { getItemById } from '../models/item';
import { HTTP_STATUS } from '../constants/httpStatus';

export const itemExists = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const item = getItemById(id);
  if (!item) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Item not found' });
  }
  next();
};