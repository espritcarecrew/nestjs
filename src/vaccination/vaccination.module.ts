import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vaccination, VaccinationSchema } from './schemas/vaccination.schema';
import { VaccinationService } from './vaccination.service';
import { VaccinationController } from './vaccination.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vaccination.name, schema: VaccinationSchema }]),
  ],
  controllers: [VaccinationController],
  providers: [VaccinationService],
})
export class VaccinationModule {}
