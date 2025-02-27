import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDateString,
  Min,
} from 'class-validator';

export class GetJobOfferQueryDto {
  @ApiProperty({
    example: '12345',
    description: 'External ID of the job offer',
  })
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  minSalary?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxSalary?: number;

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ example: 'NestJS Inc.' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 'LinkedIn' })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  experienceRequired?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  technologies?: string[];

  @ApiProperty({ example: '2025-02-25T10:00:00Z' })
  @IsDateString()
  datePosted: string;
}
