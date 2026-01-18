import { Request, Response } from 'express';
import { clearItems, getAllItems, createItem, updateItem, deleteItem } from '../src/models/item';
import Database from 'better-sqlite3';

// import { items } from '../src/models/item';

describe('Item Controller', () => {
  // beforeEach(() => { items.length = 0; });
  beforeEach(() => {
    // Clear the in-memory database before each test
    clearItems();
  });

  it('should return an empty array when no items exist', () => {
    expect(getAllItems()).toEqual([]);
  });

  it('should add a new item with valid data', () => {
    createItem("test1");
    const items = getAllItems();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('test1');
  });

  it('should update an existing item', () => {
    const item = createItem("test1");
    updateItem(item.id, "updatedName");
    const items = getAllItems();
    expect(items[0].name).toBe('updatedName');
  });

  it('should delete an existing item', () => {
    const item = createItem("test1");
    const deleted = deleteItem(item.id);
    expect(deleted?.name).toBe('test1');
    expect(getAllItems().length).toBe(0);
  });
});