import { ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';

export const NestApplicationMock = async (moduleFixture: TestingModule) => {
  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  return app;
};
