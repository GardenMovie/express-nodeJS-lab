import request from 'supertest';
import app from '../src/app';
import { clearItems, createItem } from '../src/models/item';

  beforeEach(() => { clearItems(); });

  it('updates item with valid data', async () => {
    const item = createItem('Old');
    const res = await request(app)
      .put(`/api/items/${item.id}`)
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
    const item = createItem('Old');
    const res = await request(app)
      .put(`/api/items/${item.id}`)
      .send({});
    expect(res.status).toBe(400);
  });

  it('fails with 400 if id is not a valid integer', async () => {
    const res = await request(app)
      .put('/api/items/abc')
      .send({ name: 'X' });
    expect(res.status).toBe(400);
  });
