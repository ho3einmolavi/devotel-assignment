export interface UnifiedJobOffer {
  externalId: string;
  title: string;
  employmentType?: string;
  city?: string;
  state?: string;
  isRemote: boolean;
  minSalary?: number;
  maxSalary?: number;
  currency: string;
  companyName: string;
  website?: string;
  industry?: string;
  source: string;
  experienceRequired?: number;
  technologies: string[];
  datePosted: Date;
}
