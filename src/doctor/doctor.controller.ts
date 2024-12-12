// src/doctor/doctor.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.model';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  getAllDoctors(): Doctor[] {
    return this.doctorService.getAllDoctors();
  }

  @Post()
  addDoctor(@Body() body: { name: string; specialty: string; experience: string; contact: string; location: string; imageUrl: string; rating: number }): Doctor {
    return this.doctorService.addDoctor(body.name, body.specialty, body.experience, body.contact, body.location, body.imageUrl, body.rating);
  }
}
