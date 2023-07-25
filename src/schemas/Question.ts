import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { SchoolTest } from './SchoolTest';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({
    ref: SchoolTest.name,
    type: SchemaType.Types.ObjectId,
  })
  schoolTest: SchoolTest;

  @Prop()
  question_name: string;

  @Prop()
  question_amount: number;

  @Prop({
    type: SchemaType.Types.Mixed,
  })
  questions: Record<string, string>;

  @Prop()
  question_correct: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
