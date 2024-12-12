import { Module } from '@nestjs/common';
import { DailyCheckinService } from './daily-checkin.service';
import { DailyCheckInController } from './daily-checkin.controller';

@Module({
  providers: [DailyCheckinService],
  controllers: [DailyCheckInController]
})
export class DailyCheckinModule {
}
