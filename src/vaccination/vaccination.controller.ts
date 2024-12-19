import { Controller, Post, Body } from '@nestjs/common';
import { VaccinationService } from './vaccination.service';

@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}

  @Post()
  async create(@Body() createVaccinationDto: any) {
    return this.vaccinationService.create(createVaccinationDto);
  }
}
