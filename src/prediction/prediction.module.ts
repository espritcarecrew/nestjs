import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';
import { HttpModule } from '@nestjs/axios';
import { PredictionSchema } from './prediction.schema';

@Module({
  imports: [
    HttpModule, // Permet d'appeler des API externes
    MongooseModule.forFeature([{ name: 'Prediction', schema: PredictionSchema }]),
  ],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}
