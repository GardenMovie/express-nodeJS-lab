import request from 'supertest';
import app from '../src/app';
import { items } from '../src/models/item';

describe('PUT /api/items/:id', () => {
  beforeEach(() => { items.length = 0; });

  it('updates item with valid data', async () => {
    items.push({ id: 1, name: 'Old' });
    const res = await request(app)
      .put('/api/items/1')
      .send({ name: 'New' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('New');
  });

  it('fails with 404 if item does not exist', async () => {
    const res = await request(app)
      .put('/api/items/999')
      .send({ name: 'X' });
    expect(res.status).toBe(404);
  });

  it('fails with 400 if name is missing', async () => {
    items.push({ id: 1, name: 'Old' });
    const res = await request(app)
      .put('/api/items/1')
      .send({});
    expect(res.status).toBe(400);
  });

  it('fails with 400 if id is not a valid integer', async () => {
    const res = await request(app)
      .put('/api/items/abc')
      .send({ name: 'X' });
    expect(res.status).toBe(400);
  });
});
