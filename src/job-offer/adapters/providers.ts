import { JobProvider } from '../interfaces/job-providers.interface';
import { ProviderAAdapter } from './providerA.adapter';
import { ProviderBAdapter } from './providerB.adapter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
export const JOB_PROVIDERS_TOKEN = 'EXTERNAL_JOB_PROVIDERS_TOKEN';

export const JOB_PROVIDERS: JobProvider[] = [
  {
    name: 'providerA',
    baseUrl: process.env.PROVIDER_A_URL,
    adapter: new ProviderAAdapter(),
  },
  {
    name: 'providerB',
    baseUrl: process.env.PROVIDER_B_URL,
    adapter: new ProviderBAdapter(),
  },
];
