import { JobDataAdapter } from '../interfaces/job-data-adapter.interface';
import { UnifiedJobOffer } from '../interfaces/unified-job-offer.interface';

export class ProviderBAdapter implements JobDataAdapter {
  transform(rawResponse: any): UnifiedJobOffer[] {
    const jobsListObj = rawResponse?.data?.jobsList || {};

    return Object.entries(jobsListObj)
      .map(([key, value]) => {
        const jobData = value as any;

        if (!jobData) {
          return null;
        }

        return {
          externalId: key,
          title: jobData.position,
          employmentType: undefined,
          city: jobData.location?.city,
          state: jobData.location?.state,
          isRemote: jobData.location?.remote ?? false,
          minSalary: jobData.compensation?.min,
          maxSalary: jobData.compensation?.max,
          currency: jobData.compensation?.currency || 'USD',
          companyName: jobData.employer?.companyName || 'Unknown',
          website: jobData.employer?.website,
          industry: undefined,
          source: 'providerB',
          experienceRequired: jobData.requirements?.experience,
          technologies: jobData.requirements?.technologies || [],
          datePosted: new Date(jobData.datePosted),
        };
      })
      .filter(Boolean);
  }
}
