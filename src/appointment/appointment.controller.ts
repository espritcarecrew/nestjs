// src/appointment/appointment.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get(':doctorId')
  getAppointmentsByDoctorId(@Body('doctorId') doctorId: string): Appointment[] {
    return this.appointmentService.getAppointmentsByDoctorId(doctorId);
  }

  @Post()
  bookAppointment(@Body() body: { doctorId: string; userId: string; date: string; time: string }): Appointment {
    return this.appointmentService.bookAppointment(body.doctorId, body.userId, body.date, body.time);
  }
}
