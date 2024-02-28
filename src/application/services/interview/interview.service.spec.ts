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
import {
  CreateCustomInterviewQuestionInfo,
  Question,
  SaveQuestionInfo,
} from 'src/domain/value-objects/question/custom-question.vo';
import { CompletQuestionDto } from 'src/application/dtos/question/question.dto';

class UserServiceStub {
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

class CustomInterviewsServiceStub {
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

class UrlInterviewsServiceStub {
  // async
}

class CustomInterviewQuestionServiceStub {
  async createQuestion(
    createCustomInterviewQuestionInfo: CreateCustomInterviewQuestionInfo,
  ): Promise<CompletQuestionDto[]> {
    const question =
      '1.문제\n2.2문제\n3.3문제\n4.4문제\n5.5문제\n6.6문제\n7.7문제\n8.8문제\n9.9문제\n10.10문제 ';

    const saveQuestion = this.saveQuestion(
      new SaveQuestionInfo(
        new Question(question),
        createCustomInterviewQuestionInfo.getCustomInterviewInstance(),
      ),
    );
    return saveQuestion;
  }

  async saveQuestion(
    saveQuestionInfo: SaveQuestionInfo,
  ): Promise<CompletQuestionDto[]> {
    const saveQuestion = [
      {
        id: 341,
        question:
          '자신의 나쁜 습관을 고치기 위해 어떤 노력을 하고 있는지 알려주세요.',
        interviewId: 35,
      },
      {
        id: 342,
        question:
          '어떤 상황에서도 인내심을 잃지 않고 차분하게 대처할 수 있는 방법은 무엇인가요?',
        interviewId: 35,
      },
      {
        id: 343,
        question:
          '과거에 실패한 경험을 어떻게 극복하고 성장했는지 이야기해주세요.',
        interviewId: 35,
      },
      {
        id: 344,
        question:
          '변화에 대한 적응력은 어떻게 갖추고 있는지 자세히 설명해주세요.',
        interviewId: 35,
      },
      {
        id: 345,
        question:
          '팀 프로젝트에서 어려움이 생겼을 때, 어떻게 해결하고 협업하셨는지 알려주세요.',
        interviewId: 35,
      },
      {
        id: 346,
        question:
          '자기 자신에 대한 객관적인 피드백을 받을 수 있는 방법은 어떤 것이 있나요?',
        interviewId: 35,
      },
      {
        id: 347,
        question:
          '고객과의 갈등 상황에서 어떻게 대처하고 해결하셨는지 예시를 들어 설명해주세요.',
        interviewId: 35,
      },
      {
        id: 348,
        question:
          '어려운 결정을 내려야 할 때, 어떤 기준으로 결정을 내리시나요?',
        interviewId: 35,
      },
      {
        id: 349,
        question:
          '업무 중 우선순위가 바뀌었을 때, 어떻게 대처하고 계획을 조정하시나요?',
        interviewId: 35,
      },
      {
        id: 350,
        question:
          '직장에서 발생할 수 있는 스트레스 요인들에 대해 어떻게 대처하고 관리하고 있으신가요?',
        interviewId: 35,
      },
    ];
    return saveQuestion;
  }
}

class UrlInterviewQuestionServiceStub {}

const mockDataSource = {
  transaction: jest.fn().mockImplementation((cb) => cb()),
};

describe('Interview Service', () => {
  let userService: UserServiceStub;
  let customInterviewService: CustomInterviewsServiceStub;
  let urlInterviewsService: UrlInterviewsServiceStub;
  let customInterviewQuestionService: CustomInterviewQuestionServiceStub;
  let urlInterviewQuestionService: UrlInterviewQuestionServiceStub;
  let interviewsService: InterviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewsService,
        { provide: UserService, useValue: new UserServiceStub() },
        {
          provide: CustomInterviewsService,
          useValue: new CustomInterviewsServiceStub(),
        },
        {
          provide: UrlInterviewsService,
          useValue: new UrlInterviewsServiceStub(),
        },
        {
          provide: CustomInterviewQuestionService,
          useValue: new CustomInterviewQuestionServiceStub(),
        },
        {
          provide: UrlInterviewQuestionService,
          useValue: new UrlInterviewQuestionServiceStub(),
        },
        { provide: 'DATA_SOURCE', useValue: mockDataSource },
      ],
    }).compile();

    interviewsService = module.get<InterviewsService>(InterviewsService);
    userService = module.get<UserService>(UserService);
    customInterviewService = module.get<CustomInterviewsService>(
      CustomInterviewsService,
    );
    urlInterviewsService =
      module.get<UrlInterviewsService>(UrlInterviewsService);
    customInterviewQuestionService = module.get<CustomInterviewQuestionService>(
      CustomInterviewQuestionService,
    );
    urlInterviewQuestionService = module.get<UrlInterviewQuestionService>(
      UrlInterviewQuestionService,
    );
  });

  it('createCustomInterview', async () => {
    const findUser = await userService.findUser(new UserKakaoId('1111'));

    const saveInterview = await customInterviewService.createCustomInterview(
      new CreateCustomInterviewInfo(
        new Position('backend'),
        new Stack('nest.js'),
        new Time('1'),
        findUser,
      ),
    );

    const createQuestion = await customInterviewQuestionService.createQuestion(
      new CreateCustomInterviewQuestionInfo(
        new Position('backend'),
        new Stack('nest.js'),
        saveInterview,
      ),
    );

    expect(createQuestion).toEqual([
      {
        id: 341,
        question:
          '자신의 나쁜 습관을 고치기 위해 어떤 노력을 하고 있는지 알려주세요.',
        interviewId: 35,
      },
      {
        id: 342,
        question:
          '어떤 상황에서도 인내심을 잃지 않고 차분하게 대처할 수 있는 방법은 무엇인가요?',
        interviewId: 35,
      },
      {
        id: 343,
        question:
          '과거에 실패한 경험을 어떻게 극복하고 성장했는지 이야기해주세요.',
        interviewId: 35,
      },
      {
        id: 344,
        question:
          '변화에 대한 적응력은 어떻게 갖추고 있는지 자세히 설명해주세요.',
        interviewId: 35,
      },
      {
        id: 345,
        question:
          '팀 프로젝트에서 어려움이 생겼을 때, 어떻게 해결하고 협업하셨는지 알려주세요.',
        interviewId: 35,
      },
      {
        id: 346,
        question:
          '자기 자신에 대한 객관적인 피드백을 받을 수 있는 방법은 어떤 것이 있나요?',
        interviewId: 35,
      },
      {
        id: 347,
        question:
          '고객과의 갈등 상황에서 어떻게 대처하고 해결하셨는지 예시를 들어 설명해주세요.',
        interviewId: 35,
      },
      {
        id: 348,
        question:
          '어려운 결정을 내려야 할 때, 어떤 기준으로 결정을 내리시나요?',
        interviewId: 35,
      },
      {
        id: 349,
        question:
          '업무 중 우선순위가 바뀌었을 때, 어떻게 대처하고 계획을 조정하시나요?',
        interviewId: 35,
      },
      {
        id: 350,
        question:
          '직장에서 발생할 수 있는 스트레스 요인들에 대해 어떻게 대처하고 관리하고 있으신가요?',
        interviewId: 35,
      },
    ]);
  });
});
