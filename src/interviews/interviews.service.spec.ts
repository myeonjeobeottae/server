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

  describe('createInterview', () => {
    it('createInterview', async () => {
      const testEntity = { id: 1, userKakaoId: '1232131' };
      jest.spyOn(service, 'createInterview').mockResolvedValueOnce(testEntity);
      const result = await service.createInterview('1232131');
      expect(result).toEqual(testEntity);
    });
  });

  describe('findByUserInterviews', () => {
    it('userInterviewFind', async () => {
      const testEntity = { id: 1, userKakaoId: '1232131' };
      mockRepository.save.mockResolvedValueOnce(testEntity);
      const saved = await mockRepository.save(testEntity);
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([testEntity]);
      const result = await service.findAll('1232131');
      console.log(result);

      expect(result).toEqual([testEntity]);
    });
  });
});
