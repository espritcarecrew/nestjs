import { Test, TestingModule } from '@nestjs/testing';
import { DailyCheckinService } from './daily-checkin.service';

describe('DailyCheckinService', () => {
  let service: DailyCheckinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyCheckinService],
    }).compile();

    service = module.get<DailyCheckinService>(DailyCheckinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
