import { Controller, Get, Query } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StandardResponseFactory } from 'src/common/interceptors/formatter/standard-response.factory';
import { GetJobOffersResponseDto } from './response-dto/get-job-offers.dto';
import { GetJobOfferQueryDto } from './request-dto/get-job-offers.dto';

@ApiTags('Job Offer')
@Controller('api/job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @ApiOkResponse({
    type: StandardResponseFactory(GetJobOffersResponseDto),
  })
  @Get()
  async getOffers(
    @Query() query: GetJobOfferQueryDto,
  ): Promise<GetJobOffersResponseDto> {
    console.log(query);
    return { jobOffers: [] };
  }
}
