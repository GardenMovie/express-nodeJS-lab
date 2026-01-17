import { Request, Response, NextFunction } from 'express';
import { items } from '../models/item';

export const itemExists = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  next();
};
