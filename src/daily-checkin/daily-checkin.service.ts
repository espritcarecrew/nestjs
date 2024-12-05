import { Injectable } from '@nestjs/common';
import { DailyCheckinModule } from './daily-checkin.module';

@Injectable()
export class DailyCheckinService {
    private dailyCheckIns: DailyCheckinModule[] = [];

    addDailyCheckIn(dailyCheckIn: DailyCheckinModule): DailyCheckinModule {
      this.dailyCheckIns.push(dailyCheckIn);
      return dailyCheckIn;
    }
  
    getAllDailyCheckIns(): DailyCheckinModule[] {
      return this.dailyCheckIns;
    }
}
