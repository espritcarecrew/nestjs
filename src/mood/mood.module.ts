import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { Mood, MoodSchema } from './schemas/mood.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Mood.name, schema: MoodSchema }])],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
