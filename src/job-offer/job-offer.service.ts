import { Inject, Injectable } from '@nestjs/common';
import { JOB_PROVIDERS_TOKEN } from './adapters/providers';
import { JobProvider } from './interfaces/job-providers.interface';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';
import { JobOfferFilters } from './interfaces/job-offers-filters.interface';
import { Prisma } from '@prisma/client';
import { JobOfferDto } from './response-dto/get-job-offers.dto';

@Injectable()
export class JobOfferService {
  constructor(
    @Inject(JOB_PROVIDERS_TOKEN)
    private readonly jobProviders: JobProvider[],
    private readonly prisma: PrismaService,
  ) {}

  async saveJobOffers() {
    return Promise.all(
      this.jobProviders.map(async (provider) => {
        const { data } = await axios.get(provider.baseUrl);
        const jobs = provider.adapter.transform(data);
        return this.prisma.jobOffer.createMany({
          data: jobs,
          skipDuplicates: true,
        });
      }),
    );
  }

  async getOffers(
    filters: JobOfferFilters,
    page: number,
    limit: number,
  ): Promise<JobOfferDto[]> {
    const where = this.queryBuilder(filters);
    const skip = (page - 1) * limit;
    const take = limit;
    return this.prisma.jobOffer.findMany({
      where,
      skip,
      take,
      orderBy: {
        datePosted: 'desc',
      },
    });
  }

  private queryBuilder(filters: JobOfferFilters) {
    const { city, state, minSalary, maxSalary, title } = filters;

    const where: Prisma.JobOfferWhereInput = {};

    if (city) {
      where.city = city;
    }

    if (state) {
      where.state = state;
    }

    if (minSalary !== undefined) {
      where.minSalary = { gte: +minSalary };
    }

    if (maxSalary !== undefined) {
      where.maxSalary = { lte: +maxSalary };
    }

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    return where;
  }
}
