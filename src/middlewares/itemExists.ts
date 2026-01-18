import { Request, Response, NextFunction } from 'express';
import { getItemById } from '../models/item';

export const itemExists = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const item = getItemById(id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  next();
};