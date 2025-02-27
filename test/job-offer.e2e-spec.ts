// test/job-offer.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust import to your AppModule location

describe('JobOffers (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Create a Nest testing module using your real AppModule
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // Create the Nest app and initialize it
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Clean up and close the app after tests
    await app.close();
  });

  it('GET /job-offers?minSalary=70000&limit=1', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/job-offers')
      .query({ minSalary: 70000 })
      .expect(200);
    console.log(response.body);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      title: 'Backend Developer',
    });
  });
});
