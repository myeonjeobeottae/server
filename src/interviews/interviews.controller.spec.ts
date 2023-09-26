import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { Repository } from 'typeorm';
import { Interviews } from './entities/interview.entity';
import { ShareModule } from '../share/share.module';
import { JwtModule } from '@nestjs/jwt';

describe('InterviewsController', () => {
  let controller: InterviewsController;
  let service: InterviewsService;
  let mockRepository: jest.Mocked<Partial<Repository<Interviews>>>;

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
      controllers: [InterviewsController],
      providers: [
        InterviewsService,
        {
          provide: 'INTERVIEW_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<InterviewsController>(InterviewsController);
    service = module.get<InterviewsService>(InterviewsService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('findUserInterview', () => {
    it('userInterviewFindAll', async () => {
      const result = [{ id: 1, userKakaoId: '123123123123' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const mockReq = {
        user: {
          kakaoId: '1231231',
        },
      };
      const mockRes = {
        json: jest.fn(),
      };

      await controller.findAll(mockRes as any, mockReq as any);

      expect(mockRes.json).toHaveBeenCalledWith(result);
    });
  });
});
