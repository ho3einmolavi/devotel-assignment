import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobOfferModule } from './job-offer/job-offer.module';
import { ConfigModule } from '@nestjs/config';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkerModule } from './workers/worker.module';

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
  providers: [AppService],
})
export class AppModule {}
