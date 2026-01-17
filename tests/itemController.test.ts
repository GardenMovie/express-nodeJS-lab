import { Request, Response } from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../src/controllers/itemController';
import { items } from '../src/models/item';

describe('Item Controller', () => {
  beforeEach(() => { items.length = 0; });

  it('should return an empty array when no items exist', () => {
    const req = {} as Request;
    const res = { json: jest.fn() } as unknown as Response;
    getItems(req, res, jest.fn());
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it('should add a new item with valid data', () => {
    const req = { body: { name: 'Test' } } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    createItem(req, res, jest.fn());
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Test');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test' }));
  });

  it('should update an existing item', () => {
    items.push({ id: 1, name: 'Old' });
    const req = { params: { id: '1' }, body: { name: 'New' } } as any;
    const res = { json: jest.fn() } as any;
    updateItem(req, res, jest.fn());
    expect(items[0].name).toBe('New');
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'New' }));
  });

  it('should delete an existing item', () => {
    items.push({ id: 1, name: 'ToDelete' });
    const req = { params: { id: '1' } } as any;
    const res = { json: jest.fn() } as any;
    deleteItem(req, res, jest.fn());
    expect(items.length).toBe(0);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'ToDelete' }));
  });
});