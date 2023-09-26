import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

describe('QuestionService', () => {
  let service: QuestionService;
  let mockRepository: jest.Mocked<Partial<Repository<Question>>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: 'QUESTION_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('question service', () => {
    it('save Question', async () => {
      const testEntity = {
        id: 1,
        interviewId: 1,
        question: 'test',
        answer: 'test answer',
        feedback: 'test feedback',
        time: 'test time',
      };

      const testQuestionInfo = {
        interviewId: 1,
        question: 'test',
        answer: 'test answer',
        feedback: 'test feedback',
        time: 'test time',
      };

      jest.spyOn(mockRepository, 'save').mockResolvedValue(testEntity);
      const result = await service.saveQuestion(testQuestionInfo);
      expect(result).toEqual(testEntity);
    });
  });
});
