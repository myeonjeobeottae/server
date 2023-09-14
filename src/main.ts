import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { AppModule } from './app.module';
import appConfig from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import jwtConfig from '@config/jwt.config';
import { SessionSerializer } from './auth/serializer';

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
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
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

  const sessionSerializer = app.get(SessionSerializer);
  passport.serializeUser(
    sessionSerializer.serializeUser.bind(sessionSerializer),
  );
  passport.deserializeUser(
    sessionSerializer.deserializeUser.bind(sessionSerializer),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  const port = config.port;
  await app.listen(port);
}
bootstrap();
