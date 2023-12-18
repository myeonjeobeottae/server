import { Test, TestingModule } from '@nestjs/testing';
import { CustomInterviewsController } from './custom-interviews.controller';
import { CustomInterviewsService } from './custom-interviews.service';
import { Repository } from 'typeorm';
import { CustomInterviews } from './entities/customInterviews.entity';
import { JwtModule } from '@nestjs/jwt';

describe('InterviewsController', () => {
  let controller: CustomInterviewsController;
  let service: CustomInterviewsService;
  let mockRepository: jest.Mocked<Partial<Repository<CustomInterviews>>>;

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
      controllers: [CustomInterviewsController],
      providers: [
        CustomInterviewsService,
        {
          provide: 'INTERVIEW_REPOSITORY',
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CustomInterviewsController>(
      CustomInterviewsController,
    );
    service = module.get<CustomInterviewsService>(CustomInterviewsService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('interview controller', () => {
    it('userInterviewFindAll', async () => {
      const result = [
        {
          id: 1,
          userKakaoId: '123123123123',
          position: 'backend',
          skill: 'node.js',
          time: 2,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const mockReq = {
        user: {
          kakaoId: '1231231',
        },
      };
      const mockRes = [
        {
          id: 1,
          userKakaoId: '123123123123',
          position: 'backend',
          skill: 'node.js',
        },
      ];

      await controller.findAll(mockReq as any);

      expect(mockRes).toHaveBeenCalledWith(result);
    });
  });
});
