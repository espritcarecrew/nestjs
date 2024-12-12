// src/consultation-schedule/consultation-schedule.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ConsultationScheduleService } from './consultation-schedule.service';
import { consultationScheduleModel } from './consultation-schedule.model';

@Controller('schedules')
export class ConsultationScheduleController {
  constructor(private readonly consultationScheduleService: ConsultationScheduleService) {}

  @Get(':doctorId')
  getScheduleByDoctorId(@Body('doctorId') doctorId: string): consultationScheduleModel[] {
    return this.consultationScheduleService.getScheduleByDoctorId(doctorId);
  }

  @Post()
  addSchedule(@Body() body: { doctorId: string; day: string; morningTimes: string[]; eveningTimes: string[] }): consultationScheduleModel {
    return this.consultationScheduleService.addSchedule(body.doctorId, body.day, body.morningTimes, body.eveningTimes);
  }
}
