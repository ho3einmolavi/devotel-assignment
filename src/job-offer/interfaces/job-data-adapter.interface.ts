import { UnifiedJobOffer } from './unified-job-offer.interface';

export interface JobDataAdapter {
  transform(data: any): UnifiedJobOffer[];
}
