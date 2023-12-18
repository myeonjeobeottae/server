import { response } from 'express';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import * as winston from 'winston';

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const now = Date.now();

    const winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });

    const { method, url } = req;
    winstonLogger.info(`🔵 Incoming [REST] Request: ${method} [${url}]`);

    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - now;
        const { statusCode } = res;

        winstonLogger.info(
          `✅ Completed [REST] Request to ${method} [${url}] with status ${statusCode} in ${ms}ms`,
        );
      }),
      catchError((error: any) => {
        const ms = Date.now() - now;

        winstonLogger.error(
          `🔴 [REST] Request Error to ${method} [${url}] after ${ms}ms:[${error.message}]:[${error.response.message}]`,
        );
        throw error;
      }),
    );
  }
}
