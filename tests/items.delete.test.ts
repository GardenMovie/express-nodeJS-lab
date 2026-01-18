import request from 'supertest';
import app from '../src/app';
import { clearItems, createItem } from '../src/models/item';

  beforeEach(() => { clearItems(); });

  it('deletes item if it exists', async () => {
    const item = createItem('A');
    const res = await request(app).delete(`/api/items/${item.id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('A');
  });

  it('fails with 404 if item does not exist', async () => {
    const res = await request(app).delete('/api/items/999');
    expect(res.status).toBe(404);
  });

  it('fails with 400 if id is not a valid integer', async () => {
    const res = await request(app).delete('/api/items/abc');
    expect(res.status).toBe(400);
  });
