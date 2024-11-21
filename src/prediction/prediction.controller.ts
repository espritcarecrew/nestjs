import { Controller, Post, Body } from '@nestjs/common';
import { PredictionService } from './prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post('predict')
  async predict(@Body() data: any) {
    return this.predictionService.predictHealthRisk(data);
  }
}
