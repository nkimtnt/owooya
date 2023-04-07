import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidV4 } from 'uuid';
import { version } from '../package.json';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const env = process.env.ENVIRONMENT;
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);

  app.use(cookieParser());
  app.use(compression());

  // 공용 req.header // res.header 정리
  app.use((req: Request, res: Response, next: NextFunction) => {
    //req
    req.uuid = uuidV4();
    next();

    //res
    res.append('version', `main/${version}`);
  });

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
}

bootstrap();
