import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

@Module({
  imports: [HttpModule], // Add HttpModule here
  controllers: [GeminiController],
  providers: [GeminiService],
})
export class GeminiModule {}
