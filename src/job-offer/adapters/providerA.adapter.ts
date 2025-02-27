import { JobDataAdapter } from '../interfaces/job-data-adapter.interface';
import { UnifiedJobOffer } from '../interfaces/unified-job-offer.interface';

export class ProviderAAdapter implements JobDataAdapter {
  transform(data: any): UnifiedJobOffer[] {
    console.log('Transforming data from Provider A', data);
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

      // 2. Parse the salaryRange: "$93k - $127k" → { minSalary, maxSalary, currency: 'USD' }
      let minSalary: number | undefined;
      let maxSalary: number | undefined;
      const currency = 'USD'; // default

      if (job.details?.salaryRange) {
        const [minRange, maxRange] = job.details.salaryRange
          .replace(/\$/g, '') // remove '$'
          .split('-')
          .map((s: string) => s.trim().toLowerCase().replace('k', '000'));
        // e.g. "$93k" => "93k" => "93" + "000" => "93000"
        // then parse as number
        minSalary = parseFloat(minRange);
        maxSalary = parseFloat(maxRange);
      }

      // 3. Return the unified job offer
      return {
        externalId: job.jobId,
        title: job.title,
        employmentType: job.details?.type, // e.g., "Full-Time"
        city: city,
        state: state,
        isRemote: false, // B structure doesn’t specify remote
        minSalary: minSalary,
        maxSalary: maxSalary,
        currency: currency,
        companyName: job.company?.name,
        website: undefined, // not provided in B
        industry: job.company?.industry,
        source: 'providerB',
        experienceRequired: undefined, // not provided
        technologies: job.skills || [],
        datePosted: new Date(job.postedDate),
      };
    });
  }
}
