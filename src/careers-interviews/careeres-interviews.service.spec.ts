import { Test, TestingModule } from '@nestjs/testing';
import { CareeresInterviewsService } from './careeres-interviews.service';

describe('CareeresInterviewsService', () => {
  let service: CareeresInterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareeresInterviewsService],
    }).compile();

    service = module.get<CareeresInterviewsService>(CareeresInterviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
