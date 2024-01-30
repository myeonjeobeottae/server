import { InterviewsService } from './interview.service';
import { UrlInterviewQuestionService } from '../../../domain/services/question/url-interview-question.service';
import { CustomInterviewQuestionService } from '../../../domain/services/question/custom-interview-question.service';
import { UrlInterviewsService } from '../../../domain/services/interview/url-interview.service';
import { CustomInterviewsService } from 'src/domain/services/interview/custom-interview.service';
import { UserService } from 'src/domain/services/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserInstance } from 'src/domain/value-objects/user.vo';
import { User } from 'src/domain/entities/user.entity';
import {
  CreateCustomInterviewInfo,
  CustomInterviewInfo,
  CustomInterviewInstance,
  Position,
  Stack,
  Time,
} from 'src/domain/value-objects/interview/custom-interview.vo';
import { UserKakaoId } from 'src/domain/value-objects/user.vo';
import { CustomInterviews } from 'src/domain/entities/interview.entity';

class CreateMockUserService {
  async findUser(kakaoId: UserKakaoId): Promise<UserInstance> {
    if (kakaoId.getValue() === '1111') {
      const user: User = {
        userKakaoId: '3333',
        nickname: 'testNickname',
        image: 'imgaeURL',
        email: 'email',
        urlInterviews: [],
        customInterviews: [],
      };

      return new UserInstance(user);
    }
    return null;
  }
}

class CreateMockCustomInterviewsService {
  async createCustomInterview(
    createCustomInterviewInfo: CreateCustomInterviewInfo,
  ): Promise<CustomInterviewInstance> {
    const createCustomInterview: CustomInterviews = {
      id: 1,
      stack: createCustomInterviewInfo.getStack().getValue(),
      position: createCustomInterviewInfo.getPosition().getValue(),
      time: createCustomInterviewInfo.getTime().getValue(),
      user: createCustomInterviewInfo.getUser().getValue(),
      question: [],
    };

    return new CustomInterviewInstance(createCustomInterview);
  }
}

const createMockUrlInterviewsService = () => {
  return;
};

const createMockCustomInterviewQuestionService = () => {
  return;
};

const createMockUrlInterviewQuestionService = () => {
  return;
};

const mockDataSource = {
  transaction: jest.fn().mockImplementation((cb) => cb()),
};

describe('Interview Service', () => {
  let userService: CreateMockUserService;
  let customInterviewService: CreateMockCustomInterviewsService;
  let urlInterviewsService: UrlInterviewsService;
  let customInterviewQuestionService: CustomInterviewQuestionService;
  let urlInterviewQuestionService: UrlInterviewQuestionService;
  let interviewsService: InterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewsService,
        { provide: UserService, useValue: new CreateMockUserService() },
        {
          provide: CustomInterviewsService,
          useValue: new CreateMockCustomInterviewsService(),
        },
        {
          provide: UrlInterviewsService,
          useValue: createMockUrlInterviewsService(),
        },
        {
          provide: CustomInterviewQuestionService,
          useValue: createMockCustomInterviewQuestionService(),
        },
        {
          provide: UrlInterviewQuestionService,
          useValue: createMockUrlInterviewQuestionService(),
        },
        { provide: 'DATA_SOURCE', useValue: mockDataSource },
      ],
    }).compile();

    interviewsService = module.get<InterviewsService>(InterviewsService);
    userService = module.get<UserService>(UserService);
    customInterviewService = module.get<CustomInterviewsService>(
      CustomInterviewsService,
    );
  });

  it('createCustomInterview', async () => {
    const customInterviewInfo = new CustomInterviewInfo(
      new Position('backend'),
      new Stack('nest.js'),
      new Time('1'),
      new UserKakaoId('3333'),
    );
    const user: User = {
      userKakaoId: '1111',
      nickname: 'testNickname',
      image: 'imgaeURL',
      email: 'email',
      urlInterviews: [],
      customInterviews: [],
    };

    const findUser = await userService.findUser(new UserKakaoId('1111'));

    const createCustomInterview: CustomInterviews = {
      id: 1,
      stack: 'nest.js',
      position: 'backend',
      time: '1',
      user: findUser.getValue(),
      question: [],
    };
    const saveInterview = await customInterviewService.createCustomInterview(
      new CreateCustomInterviewInfo(
        new Position('backend'),
        new Stack('nest.js'),
        new Time('1'),
        findUser,
      ),
    );
    expect(saveInterview).toEqual(
      new CustomInterviewInstance(createCustomInterview),
    );
  });
});
