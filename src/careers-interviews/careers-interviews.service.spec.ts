import { Test, TestingModule } from '@nestjs/testing';
import { CareersInterviewsService } from './careers-interviews.service';

describe('CareersInterviewsService', () => {
  let service: CareersInterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareersInterviewsService],
    }).compile();

    service = module.get<CareersInterviewsService>(CareersInterviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
