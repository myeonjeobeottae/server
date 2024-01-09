import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import appConfig from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import jwtConfig from 'src/config/jwt.config';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/http-exception/http-exception.filter';
import { AppModule } from './modules/app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  const configJwt = app.get<ConfigType<typeof jwtConfig>>(jwtConfig.KEY);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('MJAT_PROJECT')
    .setDescription('MJAT API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'Bearer', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.enableCors({
    origin: ['http://localhost:3001', 'https://interviewee.live'],
    credentials: true,
  });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      exceptionFactory(errors) {
        const message = Object.values(errors[0].constraints);

        throw new BadRequestException(message[0]);
        // 예외처리 : 이렇게 해두면 어떤 인풋의 타입에러가 발생했는지를
        // 에러 메시지를 통해 보여줍니다
      },
    }),
  );
  SwaggerModule.setup('api', app, document);
  app.use(
    session({
      secret: configJwt.secretOrKey,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  const port = config.port;
  await app.listen(port);
}
bootstrap();
