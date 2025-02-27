import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, IsNumber } from 'class-validator';

export class GetJobOfferQueryDto {
  @ApiProperty({ required: false, example: 'Software Engineer' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minSalary?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxSalary?: number;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
