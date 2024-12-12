// src/consultation-schedule/consultation-schedule.module.ts
import { Module } from '@nestjs/common';
import { ConsultationScheduleController } from './consultation-schedule.controller';
import { ConsultationScheduleService } from './consultation-schedule.service';

@Module({
  controllers: [ConsultationScheduleController],
  providers: [ConsultationScheduleService],
})
export class ConsultationScheduleModule {}
