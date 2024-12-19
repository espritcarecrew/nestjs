import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vaccination extends Document {
  @Prop({ required: true })
  babyName: string;

  @Prop({ required: true })
  vaccineDate: Date;

  @Prop({ required: true })
  vaccineType: string;
}

export const VaccinationSchema = SchemaFactory.createForClass(Vaccination);
