import { Test, TestingModule } from '@nestjs/testing';
import { CareersQuestionService } from './posting-question.service';

describe('CareersQuestionService', () => {
  let service: CareersQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareersQuestionService],
    }).compile();

    service = module.get<CareersQuestionService>(CareersQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
