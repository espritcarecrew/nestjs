// src/consultation-schedule/consultation-schedule.service.ts
import { Injectable } from '@nestjs/common';
import { consultationScheduleModel } from './consultation-schedule.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConsultationScheduleService {
  private schedules: consultationScheduleModel[] = [];

  // Récupérer les horaires d'un médecin par son ID
  getScheduleByDoctorId(doctorId: string): consultationScheduleModel[] {
    return this.schedules.filter(schedule => schedule.doctorId === doctorId);
  }

  // Ajouter des horaires de consultation pour un médecin
  addSchedule(
    doctorId: string,
    day: string,
    morningTimes: string[],
    eveningTimes: string[]
  ): consultationScheduleModel {
    const newSchedule = {
      id: uuidv4(),
      doctorId,
      day,
      morningTimes,
      eveningTimes,
    };
    this.schedules.push(newSchedule);
    return newSchedule;
  }
}
