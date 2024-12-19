import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vaccination } from './schemas/vaccination.schema';

@Injectable()
export class VaccinationService {
  constructor(
    @InjectModel(Vaccination.name) private vaccinationModel: Model<Vaccination>,
  ) {}

  async create(data: any): Promise<Vaccination> {
    const createdVaccination = new this.vaccinationModel(data);
    return createdVaccination.save();
  }
}
