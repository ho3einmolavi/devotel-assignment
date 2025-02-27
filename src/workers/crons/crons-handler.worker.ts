import { JobOfferService } from './../../job-offer/job-offer.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class CronsHandlerWorker {
  private readonly logger = new Logger(CronsHandlerWorker.name);
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Cron(process.env.CRON_CONFIG)
  async syncJobOffers() {
    this.logger.log('Running cron job to sync job offers');
    return this.jobOfferService.saveJobOffers();
  }
}
