import request from 'supertest';
import app from '../src/app';
import { clearItems, createItem } from '../src/models/item';

describe('GET /api/items', () => {
  beforeEach(() => { clearItems(); });

  it('returns empty array when no items exist', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('returns all items after creation', async () => {
    createItem('A');
    createItem('B');
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});

describe('GET /api/items/:id', () => {
  beforeEach(() => { clearItems(); });

  it('returns the correct item if it exists', async () => {
    const item = createItem('A');
    const res = await request(app).get(`/api/items/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('A');
  });

  it('fails with 404 if item does not exist', async () => {
    const res = await request(app).get('/api/items/999');
    expect(res.status).toBe(404);
  });

  it('fails with 400 if id is not a valid integer', async () => {
    const res = await request(app).get('/api/items/abc');
    expect(res.status).toBe(400);
  });
});
