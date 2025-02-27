// crons-handler.worker.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JobOfferService } from '../../job-offer/job-offer.service';
import { CronsHandlerWorker } from './crons-handler.worker';

describe('CronsHandlerWorker', () => {
  let worker: CronsHandlerWorker;
  let jobOfferService: JobOfferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronsHandlerWorker,
        {
          provide: JobOfferService,
          useValue: {
            saveJobOffers: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    worker = module.get<CronsHandlerWorker>(CronsHandlerWorker);
    jobOfferService = module.get<JobOfferService>(JobOfferService);
  });

  it('should call jobOfferService.saveJobOffers when syncJobOffers is triggered', async () => {
    await worker.syncJobOffers();
    expect(jobOfferService.saveJobOffers).toHaveBeenCalledTimes(1);
  });
});
