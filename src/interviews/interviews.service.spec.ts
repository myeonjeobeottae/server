import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsService } from './interviews.service';
import { Repository } from 'typeorm';
import { Interviews } from './entities/interview.entity';

describe('InterviewsService', () => {
  let service: InterviewsService;
  let mockRepository: jest.Mocked<Partial<Repository<Interviews>>>;
  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewsService,
        {
          provide: 'INTERVIEW_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<InterviewsService>(InterviewsService);
  });

  describe('interview service', () => {
    it('createInterview', async () => {
      const testEntity = {
        id: 1,
        userId: '1232131',
        position: 'dd',
        skill: 's',
        userKakaoId: 'kakao id',
        time: 1,
      };
      mockRepository.save.mockResolvedValue(testEntity);
      const interviewInfo = {
        userId: '123123',
        position: 'dd',
        skill: 's',
        time: 2,
      };
      const result = await service.createInterview(interviewInfo);

      expect(result).toEqual(testEntity);
    });

    it('userInterviewFind', async () => {
      const testEntity = [
        {
          id: 1,
          userKakaoId: '1232131',
          position: 'dd',
          skill: 's',
          time: 1,
        },
      ];
      mockRepository.find.mockResolvedValueOnce(testEntity);
      const result = await service.findAll('1232131');

      expect(result).toEqual(testEntity);
    });
  });
});
