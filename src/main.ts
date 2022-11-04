import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppTestModule } from './test/app/app-test.module';


async function bootstrap() {
  console.log('Nest factory start');
  const app = await NestFactory.create<NestExpressApplication>(AppTestModule, {
    cors: {
      origin: '*',
    },
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe()); //used to validations with class-validator
  
  await app.listen(3000);
}
bootstrap();
