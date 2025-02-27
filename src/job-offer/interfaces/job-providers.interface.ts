import { JobDataAdapter } from './job-data-adapter.interface';

export interface JobProvider {
  name: string;
  baseUrl: string;
  adapter: JobDataAdapter;
}
