// src/doctor/doctor.service.ts
import { Injectable } from '@nestjs/common';
import { Doctor } from './doctor.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DoctorService {
  private doctors: Doctor[] = [];

  // Récupérer tous les médecins
  getAllDoctors(): Doctor[] {
    return this.doctors;
  }

  // Ajouter un médecin
  addDoctor(
    name: string,
    specialty: string,
    experience: string,
    contact: string,
    location: string,
    imageUrl: string,
    rating: number
  ): Doctor {
    const newDoctor = {
      id: uuidv4(),
      name,
      specialty,
      experience,
      contact,
      location,
      imageUrl,
      rating,
    };
    this.doctors.push(newDoctor);
    return newDoctor;
  }
}
