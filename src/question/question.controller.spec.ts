import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;
  let mockRepository: jest.Mocked<Partial<Repository<Question>>>;

  beforeEach(async () => {
    jest.mock('../auth/jwt/jwt-auth.guard', () => ({
      canActivate: jest.fn().mockResolvedValue(true),
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'TEST_SECRET',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      controllers: [QuestionController],
      providers: [
        QuestionService,
        {
          provide: 'QUESTION_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  describe('question controller', () => {
    it('question save', async () => {
      const result = {
        id: 1,
        interviewId: 1,
        question: 'test',
        answer: 'test answer',
        feedback: 'test feedback',
        time: 'test time',
      };
      jest.spyOn(service, 'saveQuestion').mockResolvedValue(result);
      const mockReq = {
        interviewId: 1,
        question: 'test',
        answer: 'test answer',
        feedback: 'test feedback',
        time: 'test time',
      };

      const mockRes = await controller.saveQuestion(mockReq);
      expect(mockRes).toBe(result);
    });
  });
});
