import { ApiProperty } from '@nestjs/swagger';

export class JobOfferDto {
  @ApiProperty({ type: Number, required: true })
  id: number;

  @ApiProperty({ type: String, required: true })
  title: string;

  @ApiProperty({ type: String, required: false })
  employmentType?: string;

  @ApiProperty({ type: String, required: false })
  city?: string;

  @ApiProperty({ type: String, required: false })
  state?: string;

  @ApiProperty({ type: Boolean, required: false, default: false })
  isRemote?: boolean;

  @ApiProperty({ type: Number, required: false })
  minSalary?: number;

  @ApiProperty({ type: Number, required: false })
  maxSalary?: number;

  @ApiProperty({ type: String, required: true })
  currency: string;

  @ApiProperty({ type: String, required: true })
  companyName: string;

  @ApiProperty({ type: String, required: false })
  website?: string;

  @ApiProperty({ type: String, required: false })
  industry?: string;

  @ApiProperty({ type: Number, required: false })
  experienceRequired?: number;

  @ApiProperty({ type: [String], required: false })
  technologies?: string[];

  @ApiProperty({ type: Date, required: true })
  datePosted: Date;

  @ApiProperty({ type: Date, required: true })
  createdAt: Date;

  @ApiProperty({ type: Date, required: true })
  updatedAt: Date;
}

export class GetJobOffersResponseDto {
  @ApiProperty({ type: JobOfferDto, isArray: true, required: true })
  jobOffers: JobOfferDto[];
}
