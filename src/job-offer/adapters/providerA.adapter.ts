import { JobDataAdapter } from '../interfaces/job-data-adapter.interface';
import { UnifiedJobOffer } from '../interfaces/unified-job-offer.interface';

export class ProviderAAdapter implements JobDataAdapter {
  transform(data: any): UnifiedJobOffer[] {
    return data.jobs.map((job: any) => {
      let city: string | undefined = undefined;
      let state: string | undefined = undefined;
      if (job.details?.location) {
        const [parsedCity, parsedState] = job.details.location
          .split(',')
          .map((s: string) => s.trim());
        city = parsedCity;
        state = parsedState;
      }

      let minSalary: number | undefined;
      let maxSalary: number | undefined;
      const currency = 'USD';

      if (job.details?.salaryRange) {
        const [minRange, maxRange] = job.details.salaryRange
          .replace(/\$/g, '')
          .split('-')
          .map((s: string) => s.trim().toLowerCase().replace('k', '000'));
        minSalary = parseFloat(minRange);
        maxSalary = parseFloat(maxRange);
      }

      return {
        externalId: job.jobId,
        title: job.title,
        employmentType: job.details?.type,
        city: city,
        state: state,
        isRemote: false,
        minSalary: minSalary,
        maxSalary: maxSalary,
        currency: currency,
        companyName: job.company?.name,
        website: undefined,
        industry: job.company?.industry,
        source: 'providerB',
        experienceRequired: undefined,
        technologies: job.skills || [],
        datePosted: new Date(job.postedDate),
      };
    });
  }
}
