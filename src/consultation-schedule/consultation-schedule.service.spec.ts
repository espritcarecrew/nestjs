import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationScheduleService } from './consultation-schedule.service';

describe('ConsultationScheduleService', () => {
  let service: ConsultationScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationScheduleService],
    }).compile();

    service = module.get<ConsultationScheduleService>(ConsultationScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
