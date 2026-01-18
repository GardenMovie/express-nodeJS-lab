import { Request, Response, NextFunction } from 'express';
import { getAllItems, getItemById as dbGetItemById, createItem as dbCreateItem, updateItem as dbUpdateItem, deleteItem as dbDeleteItem } from '../models/item';

// Get all items
export const getAllItemsController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = getAllItems();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

// Get item by ID
export const getItemByIdController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const item = dbGetItemById(id);
        res.json(item);
    } catch (error) {
        next(error);
    }
};

// Create an item
export const createItemController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const item = dbCreateItem(name.trim());
        res.status(201).json(item);
    } catch (error) {
        next(error);
    }
};

// Update an item
export const updateItemController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        const updated = dbUpdateItem(id, name.trim());
        res.json(updated);
    } catch (error) {
        next(error);
    }
};

// Delete an item
export const deleteItemController = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const deleted = dbDeleteItem(id);
        res.json(deleted);
    } catch (error) {
        next(error);
    }
};