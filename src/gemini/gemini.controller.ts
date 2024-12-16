import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { CreateContentDto } from './dto/create-content.dto/create-content.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate')
  async generateContent(@Body() body: any): Promise<any> {
    return this.geminiService.generateContent(body);
  }
}
