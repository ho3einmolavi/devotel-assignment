import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOfferModule } from './job-offer/job-offer.module';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerModule } from './workers/worker.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatter } from './common/interceptors/formatter/formatter.interceptor';

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
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatter,
    },
  ],
})
export class AppModule {}
