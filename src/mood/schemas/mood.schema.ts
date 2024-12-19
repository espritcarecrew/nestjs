import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Mood extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  mood: number;

  @Prop({ type: [String], default: [] })
  discomforts: string[];

  @Prop({ default: '' })
  notes: string;
}

export const MoodSchema = SchemaFactory.createForClass(Mood);
