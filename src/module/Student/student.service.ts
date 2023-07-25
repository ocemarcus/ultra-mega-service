import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { StudentDto } from './dto/student.dto';
import { Question, QuestionDocument } from 'src/schemas/Question';
import { Student, StudentDocument } from 'src/schemas/Student';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}
  async find(schoolTestId: string) {
    const questions = await this.questionModel
      .find({
        schoolTest: schoolTestId,
      })
      .populate('schoolTest')
      .exec();

    return questions.map((item) => ({
      ...item.toObject(),
      question_amount: undefined,
      question_correct: undefined,
    }));
  }
  async findQuestionsResult() {
    const questions = await this.studentModel
      .find()
      .select([
        'average',
        'student_email',
        'student_name',
        'points_scored',
        'question_success',
        'question_quantity',
        'question_total_amount',
      ])
      .populate('schoolTest')
      .exec();

    return questions.map((item) => item.toObject());
  }
  async findResultById(id: string) {
    return await this.studentModel
      .findById(id)
      .populate('schoolTest')
      .populate({
        path: 'questions',
        populate: {
          path: 'question',
          model: Question.name,
        },
      })
      .exec();
  }
  async findQuestionsById(ids: string[]) {
    const questions = await this.questionModel.find({
      _id: {
        $in: ids,
      },
    });
    return questions.map((item) => item.toObject());
  }
  async save(body: StudentDto) {
    const questionsIds = body.questions.map((item) => item.questionId);

    const questions = await this.findQuestionsById(questionsIds);

    let average = 0;
    let pointsScored = 0;
    let question_success = 0;
    let question_total_amount = 0;
    const questionsStudent = [];

    for (let i = 0; i < body.questions.length; i++) {
      const qStudent = body.questions[i];
      const questionId = new mongoose.Types.ObjectId(qStudent.questionId);
      const q = questions.find((q) => q._id.equals(questionId));
      if (!q) continue;

      if (qStudent.question_selected === q.question_correct) {
        question_success += 1;
        pointsScored += q.question_amount;
        average += q.question_amount;
      }
      question_total_amount += q.question_amount;

      questionsStudent.push({
        ...qStudent,
        question: questionId,
        question_amount: q.question_amount,
        question_correct: q.question_correct,
      });
    }
    const instance = new this.studentModel({
      question_success,
      question_total_amount,
      questions: questionsStudent,
      points_scored: pointsScored,
      schoolTest: body.schoolTestId,
      student_name: body.student_name,
      student_email: body.student_email,
      average: average / questionsStudent.length,
      question_quantity: questionsStudent.length,
    });
    await instance.save();
  }
}
