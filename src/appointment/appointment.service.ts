// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { Appointment } from './appointment.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppointmentService {
  private appointments: Appointment[] = [];

  // Récupérer tous les rendez-vous pour un médecin
  getAppointmentsByDoctorId(doctorId: string): Appointment[] {
    return this.appointments.filter(app => app.doctorId === doctorId);
  }

  // Réserver un rendez-vous
  bookAppointment(
    doctorId: string,
    userId: string,
    date: string,
    time: string
  ): Appointment {
    const newAppointment = {
      id: uuidv4(),
      doctorId,
      userId,
      date,
      time,
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }
}
