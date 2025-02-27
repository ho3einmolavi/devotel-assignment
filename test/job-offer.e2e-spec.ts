import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestAppModule } from './test-app.module';

describe('JobOffers (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /job-offers should return one job offer with minSalary >= 70000 and limit the result to 1', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/job-offers')
      .query({ minSalary: 70000, limit: 1 })
      .expect(200);
    expect(response.body.payload.jobOffers).toHaveLength(1);
    expect(response.body.payload.jobOffers[0].minSalary).toBeGreaterThanOrEqual(
      70000,
    );
  });
});
