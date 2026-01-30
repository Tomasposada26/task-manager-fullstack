const request = require('supertest');
const app = require('../src/app').default;

describe('Health check', () => {
  it('should return 404 for root', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(404);
  });
});
