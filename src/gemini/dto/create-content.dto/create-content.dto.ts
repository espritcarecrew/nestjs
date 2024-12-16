import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateContentDto {
  @IsString()
  prompt: string;

  @IsOptional()
  @IsNumber()
  temperature?: number;
}
