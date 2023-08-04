import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { StudentDto } from './dto/student.dto';
import { Question, QuestionDocument } from '../../schemas/Question';
import { Student, StudentDocument } from '../../schemas/Student';

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
    const q: Record<string, Question> = {};
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i].toObject();
      q[question._id] = question;
    }
    return q;
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
      const q = questions[qStudent.questionId];

      if (qStudent.question_selected === q.question_correct) {
        question_success += 1;
        pointsScored += q.question_amount;
        average += q.question_amount;
      }
      question_total_amount += q.question_amount;

      questionsStudent.push({
        ...qStudent,
        question: qStudent.questionId,
        question_amount: q.question_amount,
        question_correct: q.question_correct,
      });
    }
    const save = {
      question_success,
      question_total_amount,
      questions: questionsStudent,
      points_scored: pointsScored,
      schoolTest: body.schoolTestId,
      student_name: body.student_name,
      student_email: body.student_email,
      average: average / questionsStudent.length,
      question_quantity: questionsStudent.length,
    };
    await this.saveStudent(save);
  }
  async saveStudent(save: any) {
    const instance = new this.studentModel(save);
    await instance.save();
  }
}
