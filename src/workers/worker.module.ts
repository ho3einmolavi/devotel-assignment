import { Module } from '@nestjs/common';
import { CronsHandlerWorker } from './crons/crons-handler.worker';
import { JobOfferModule } from '../job-offer/job-offer.module';

@Module({
  imports: [JobOfferModule],
  providers: [CronsHandlerWorker],
})
export class WorkerModule {}
