import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolTestModule } from './module/SchoolTest/schoolTest.module';
import { QuestionModule } from './module/Question/question.module';
import { StudentModule } from './module/Student/student.module';

const DB_URL = process.env.DB_URL ?? 'mongodb://localhost/dmpeople';

console.log(DB_URL)

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    QuestionModule,
    StudentModule,
    SchoolTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
