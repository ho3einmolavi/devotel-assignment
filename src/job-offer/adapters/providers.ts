import { JobProvider } from '../interfaces/job-providers.interface';
import { ProviderAAdapter } from './providerA.adapter';
import { ProviderBAdapter } from './providerB.adapter';

export const JOB_PROVIDERS_TOKEN = 'EXTERNAL_JOB_PROVIDERS_TOKEN';

export const JOB_PROVIDERS: JobProvider[] = [
  {
    name: 'providerA',
    baseUrl: 'https://assignment.devotel.io/api/provider1/jobs',
    adapter: new ProviderAAdapter(),
  },
  {
    name: 'providerB',
    baseUrl: 'https://assignment.devotel.io/api/provider2/jobs',
    adapter: new ProviderBAdapter(),
  },
];
