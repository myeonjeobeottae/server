import { Test, TestingModule } from '@nestjs/testing';
import { CareeresInterviewsController } from './careeres-interviews.controller';
import { CareeresInterviewsService } from './careeres-interviews.service';

describe('PostingInterviewsController', () => {
  let controller: CareeresInterviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareeresInterviewsController],
      providers: [CareeresInterviewsService],
    }).compile();

    controller = module.get<CareeresInterviewsController>(
      CareeresInterviewsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
