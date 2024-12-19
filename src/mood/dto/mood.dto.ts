import { PartialType } from '@nestjs/swagger';

export class CreateMoodDto {
    date: string;
    mood: number;
    discomforts: string[];
    notes: string;
  }
