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
      find: jest.fn(),
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
        userKakaoId: 'kakao id',
      };

      const testQuestionInfo = {
        interviewId: 1,
        question: 'test',
        answer: 'test answer',
        feedback: 'test feedback',
        time: 'test time',
      };
      mockRepository.save.mockResolvedValue(testEntity);
      const result = await service.saveQuestion(testQuestionInfo);

      expect(result).toBe(testEntity);
    });

    it('Questions included in the interview', async () => {
      const testEntity = [
        {
          id: 1,
          interviewId: 1,
          question: 'test',
          answer: 'test answer',
          feedback: 'test feedback',
          time: 'test time',
          userKakaoId: 'kakao id',
        },
        {
          id: 2,
          interviewId: 1,
          question: 'test',
          answer: 'test answer',
          feedback: 'test feedback',
          time: 'test time',
          userKakaoId: 'kakao id',
        },
      ];

      const findQuestionsIncludedInTheInterviewInfo = {
        interviewId: 1,
        userKakaoId: 'kakao id',
      };

      const testResult = mockRepository.find.mockResolvedValue(testEntity);
      const result = await service.QuestionsIncludedInTheInterview(
        findQuestionsIncludedInTheInterviewInfo,
      );

      console.log(testResult);

      expect(result).toBe(testEntity);
      expect(testResult).toHaveBeenCalledWith({
        where: { interviewId: 1, userKakaoId: 'kakao id' },
        select: ['id', 'question', 'answer', 'feedback', 'time'],
      });
    });
  });
});
