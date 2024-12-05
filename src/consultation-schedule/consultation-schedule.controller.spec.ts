import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationScheduleController } from './consultation-schedule.controller';

describe('ConsultationScheduleController', () => {
  let controller: ConsultationScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationScheduleController],
    }).compile();

    controller = module.get<ConsultationScheduleController>(ConsultationScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
