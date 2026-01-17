import { Router } from 'express';

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from '../controllers/itemController';
import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { itemExists } from '../middlewares/itemExists';

const router = Router();


router.get('/', getItems);
router.post(
  '/',
  body('name').isString().notEmpty().withMessage('Name is required and must be a non-empty string'),
  validateRequest,
  createItem
);

router.get(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  validateRequest,
  itemExists,
  getItemById
);

router.put(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  body('name').isString().notEmpty().withMessage('Name is required and must be a non-empty string'),
  validateRequest,
  itemExists,
  updateItem
);

router.delete(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  validateRequest,
  itemExists,
  deleteItem
);

export default router;

