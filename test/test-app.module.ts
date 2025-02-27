import { Logger, Module } from '@nestjs/common';
import { JobOfferModule } from '../src/job-offer/job-offer.module'; // Adjust the path accordingly
import { WorkerModule } from '../src/workers/worker.module';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatter } from '../src/common/interceptors/formatter/formatter.interceptor';

@Module({
  imports: [
    JobOfferModule,
    WorkerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatter,
    },
  ],
})
export class TestAppModule {}
