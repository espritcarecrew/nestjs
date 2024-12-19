import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MoodService } from './mood.service';
import { CreateMoodDto } from './dto/mood.dto';

@Controller('moods')
export class MoodController {
  constructor(private readonly moodService: MoodService) {}

  @Post()
  async create(@Body() createMoodDto: CreateMoodDto) {
    return this.moodService.create(createMoodDto);
  }

  @Get()
  async findAll() {
    return this.moodService.findAll();
  }

  @Get('date')
  async findByDate(@Query('date') date: string) {
    return this.moodService.findByDate(date);
  }

  @Get('statistics')
  async getStatistics() {
    return this.moodService.getStatistics();
  }
}
