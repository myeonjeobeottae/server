import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | object = 'Internal server error'; // 기본 에러 메시지 설정

    if (exception instanceof HttpException) {
      // HttpException의 메시지 또는 전체 응답을 가져옵니다.
      const response = exception.getResponse();
      message =
        typeof response === 'object' && response['message']
          ? response['message']
          : response;
    } else if (exception instanceof Error) {
      // 일반 Error인 경우, exception.message를 사용합니다.
      // 여기서는 사용자 정의 메시지 또는 Error의 기본 메시지를 사용할 수 있습니다.

      message = exception.message || 'Unexpected error occurred';
    }

    if (httpStatus === HttpStatus.BAD_REQUEST && typeof message === 'string') {
      message = `Bad request: ${message}`; // or any other custom logic
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
      path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };
    // console.log(exception);
    console.log(responseBody);

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
