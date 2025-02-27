import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { JobOfferController } from './job-offer.controller';
import { JOB_PROVIDERS, JOB_PROVIDERS_TOKEN } from './adapters/providers';

@Module({
  controllers: [JobOfferController],
  providers: [
    JobOfferService,
    {
      provide: JOB_PROVIDERS_TOKEN,
      useValue: JOB_PROVIDERS,
    },
  ],
})
export class JobOfferModule {}
