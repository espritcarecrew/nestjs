import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mood } from './schemas/mood.schema';
import { CreateMoodDto } from './dto/mood.dto';

@Injectable()
export class MoodService {
  constructor(@InjectModel(Mood.name) private moodModel: Model<Mood>) {}

  // Create a new mood entry
  async create(createMoodDto: CreateMoodDto): Promise<Mood> {
    const newMood = new this.moodModel(createMoodDto);
    return newMood.save();
  }

  // Get all moods
  async findAll(): Promise<Mood[]> {
    return this.moodModel.find().exec();
  }

  // Get moods by date
  async findByDate(date: string): Promise<Mood[]> {
    return this.moodModel.find({ date }).exec();
  }

  // Get statistics
  async getStatistics(): Promise<any> {
    const moods = await this.moodModel.find().exec();

    // Calculate most common mood
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b,
    );

    // Calculate most common discomforts
    const discomfortCounts = moods
      .flatMap((mood) => mood.discomforts)
      .reduce((acc, discomfort) => {
        acc[discomfort] = (acc[discomfort] || 0) + 1;
        return acc;
      }, {});

    const sortedDiscomforts = Object.entries(discomfortCounts)
      .sort(([, a], [, b]) => (Number(b) || 0) - (Number(a) || 0))
      .map(([discomfort]) => discomfort);

    return {
      mostCommonMood,
      topDiscomforts: sortedDiscomforts,
    };
  }
}
