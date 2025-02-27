import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { JOB_PROVIDERS_TOKEN } from './adapters/providers';
import { JobProvider } from './interfaces/job-providers.interface';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class JobOfferService {
  constructor(
    @Inject(JOB_PROVIDERS_TOKEN)
    private readonly jobProviders: JobProvider[],
    private readonly prisma: PrismaService,
  ) {}

  @Cron('*/5 * * * * *')
  async saveJobOffers() {
    for (const provider of this.jobProviders) {
      const { data } = await axios.get(provider.baseUrl);
      const jobs = provider.adapter.transform(data);
      console.log(jobs);
      // create bulk jobs in the database
      await this.prisma.jobOffer.createMany({
        data: jobs,
        skipDuplicates: true,
      });
    }
  }
}
