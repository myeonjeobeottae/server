import { Test, TestingModule } from '@nestjs/testing';
import { CareersQuestionController } from './careers-question.controller';
import { CareersQuestionService } from './posting-question.service';

describe('PostingQuestionController', () => {
  let controller: CareersQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareersQuestionController],
      providers: [CareersQuestionService],
    }).compile();

    controller = module.get<CareersQuestionController>(
      CareersQuestionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
