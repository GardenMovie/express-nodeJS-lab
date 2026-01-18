import { Router } from 'express';
import { body, param } from 'express-validator';

import {
  createItemController,
  getAllItemsController,
  getItemByIdController,
  updateItemController,
  deleteItemController,
} from '../controllers/itemController';
import { validateRequest } from '../middlewares/validateRequest';
import { itemExists } from '../middlewares/itemExists';

const router = Router();

router.get('/', getAllItemsController);
router.post(
  '/',
  body('name').isString().notEmpty().withMessage('Name is required and must be a non-empty string'),
  validateRequest,
  createItemController
);

router.get(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  validateRequest,
  itemExists,
  getItemByIdController
);

router.put(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  body('name').isString().notEmpty().withMessage('Name is required and must be a non-empty string'),
  validateRequest,
  itemExists,
  updateItemController
);

router.delete(
  '/:id',
  param('id').isInt({ min: 0 }).withMessage('ID must be a positive integer'),
  validateRequest,
  itemExists,
  deleteItemController
);

export default router;

