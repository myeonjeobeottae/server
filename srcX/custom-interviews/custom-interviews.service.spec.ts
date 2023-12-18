import { Test, TestingModule } from '@nestjs/testing';
import { CustomInterviewsService } from './custom-interviews.service';
import { Repository } from 'typeorm';
import { CustomInterviews } from './entities/customInterviews.entity';

describe('InterviewsService', () => {
  let service: CustomInterviewsService;
  let mockRepository: jest.Mocked<Partial<Repository<CustomInterviews>>>;
  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomInterviewsService,
        {
          provide: 'INTERVIEW_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomInterviewsService>(CustomInterviewsService);
  });

  describe('interview service', () => {
    it('createInterview', async () => {
      const testEntity = {
        id: 1,
        position: 'dd',
        skill: 's',
        userKakaoId: 'kakao id',
        time: 1,
      };
      mockRepository.save.mockResolvedValue(testEntity);
      const interviewInfo = {
        userKakaoId: '123123',
        position: 'dd',
        skill: 's',
        time: 2,
      };
      const result = await service.saveInterview(interviewInfo);

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
