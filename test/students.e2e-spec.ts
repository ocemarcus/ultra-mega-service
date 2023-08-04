import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NestApplicationMock } from './nestApplicationMock';
import { StudentService } from '../src/module/Student/student.service';

describe('Student (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StudentService)
      .useValue({
        findQuestionsResult: jest.fn().mockReturnValue([]),
        save: jest.fn().mockResolvedValue({}),
      })
      .compile();
    app = await NestApplicationMock(moduleFixture);
  });
  afterEach(async () => app.close());

  it('/students/result (GET)', () => {
    return request(app.getHttpServer()).get('/students/result').expect(200);
  });
  describe('/students (POST)', () => {
    it('should return validate error', () => {
      return request(app.getHttpServer())
        .post('/students')
        .send({})
        .expect(400);
    });
    it('should return success', () => {
      const body = {
        schoolTestId: 'id',
        student_name: 'student',
        student_email: 'student@gmail.com',
        questions: [
          {
            questionId: 'id',
            questions: { A: 'A' },
            question_selected: 'A',
          },
        ],
      };
      return request(app.getHttpServer())
        .post('/students')
        .send(body)
        .expect(201);
    });
  });
});
