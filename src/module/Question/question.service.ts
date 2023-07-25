import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';
import { Question, QuestionDocument } from '../../schemas/Question';
import { QuestionDto, QuestionUpdateDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}
  async find() {
    return await this.questionModel.find().populate('schoolTest');
  }
  async findById(id: string) {
    const question = await this.questionModel
      .findById(id)
      .populate('schoolTest');
    return question.toObject();
  }
  async findQuestionsStudent(schoolTestId: string) {
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
  async save(body: QuestionDto) {
    const instance = new this.questionModel(body);
    await instance.save();
  }
  async updateById(body: QuestionUpdateDto, _id: string) {
    await this.questionModel.updateMany({ _id }, { $set: body });
  }
}
