import { Test, TestingModule } from '@nestjs/testing';
import { CareersInterviewsController } from './careers-interviews.controller';
import { CareersInterviewsService } from './careers-interviews.service';

describe('CareersInterviewsController', () => {
  let controller: CareersInterviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareersInterviewsController],
      providers: [CareersInterviewsService],
    }).compile();

    controller = module.get<CareersInterviewsController>(
      CareersInterviewsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
