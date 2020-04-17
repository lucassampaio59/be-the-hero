const app = require('../../src/app');
const connection = require('../../src/database/connection');
const request = require('supertest');

describe('NGO', () => { 
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  
  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: "TsT",
        email: "tst@test.com",
        whatsapp: "9123456789",
        city: "São Paulo",
        fu: "SP"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);
  });

  it('should be able to create and log-in with a new NGO', async () => {
    const response = await request(app)
    .post('/ngos')
    .send({
      name: "TsT",
      email: "tst@test.com",
      whatsapp: "9123456789",
      city: "São Paulo",
      fu: "SP"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

    const loginResponse = await request(app)
      .post('/sessions')
      .send({
        id: response.body.id
      });

    expect(loginResponse.body).toHaveProperty('name');
  });
});