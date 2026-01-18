import request from 'supertest';
import app from '../src/app';
import { clearItems } from '../src/models/item';

describe('POST /api/items', () => {
  beforeEach(() => { clearItems(); });

  it('creates an item with valid data', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Test Item' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Item');
  });

  it('fails with 400 if name is missing', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({});
    expect(res.status).toBe(400);
  });

  it('fails with 400 if name is empty', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: '' });
    expect(res.status).toBe(400);
  });

  it('fails with 400 if name is not a string', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 123 });
    expect(res.status).toBe(400);
  });
});
