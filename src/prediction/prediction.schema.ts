import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PredictionDocument = Prediction & Document;

@Schema()
export class Prediction {
  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  systolicBP: number;

  @Prop({ required: true })
  diastolicBP: number;

  @Prop({ required: true })
  bs: number;

  @Prop({ required: true })
  bodyTemp: number;

  @Prop({ required: true })
  heartRate: number;

  @Prop({ required: true })
  riskLevel: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);
