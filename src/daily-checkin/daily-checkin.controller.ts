
import { Controller, Post, Body, Get } from '@nestjs/common';
import { DailyCheckinService } from './daily-checkin.service';
import { DailyCheckinModule } from './daily-checkin.module';


@Controller('daily-checkin')
export class DailyCheckInController {
  constructor(private readonly dailyCheckInService: DailyCheckinService) {}

  @Post()
  addDailyCheckIn(@Body() dailyCheckIn: DailyCheckinModule): DailyCheckinModule {
    return this.dailyCheckInService.addDailyCheckIn(dailyCheckIn);
  }

  @Get()
  getAllDailyCheckIns(): DailyCheckinModule[] {
    return this.dailyCheckInService.getAllDailyCheckIns();
  }
}
