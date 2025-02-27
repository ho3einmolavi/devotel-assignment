import { JobOfferService } from './../../job-offer/job-offer.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class CronsHandlerWorker {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Cron(process.env.CRON_CONFIG)
  async syncJobOffers() {
    console.log('Syncing job offers');
    return this.jobOfferService.saveJobOffers();
  }
}
