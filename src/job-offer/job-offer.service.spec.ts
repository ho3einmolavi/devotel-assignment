import { ProviderAAdapter } from './adapters/providerA.adapter';
import { JobDataAdapter } from './interfaces/job-data-adapter.interface';

describe('JobOfferAdapter', () => {
  let adapter: JobDataAdapter;

  beforeEach(() => {
    adapter = new ProviderAAdapter();
  });

  it('should transform raw data into a job offer array', () => {
    const rawData = {
      jobs: [
        {
          jobId: 'P1-73',
          title: 'Backend Engineer',
          details: {
            location: 'Austin, TX',
            type: 'Part-Time',
            salaryRange: '$77k - $148k',
          },
        },
        {
          title: 'Backend Engineer',
          details: {
            location: 'Austin, TX',
            type: 'Contract',
            salaryRange: '$98k - $116k',
          },
        },
      ],
    };
    const result = adapter.transform(rawData);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      city: 'Austin',
      minSalary: 77000, // assume we convert '77k' to 77000
    });
  });
});
