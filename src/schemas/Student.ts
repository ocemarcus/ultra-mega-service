import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as SchemaType } from 'mongoose';
import { SchoolTest } from './SchoolTest';
import { Question } from './Question';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({
    ref: SchoolTest.name,
    type: SchemaType.Types.ObjectId,
  })
  schoolTest: SchoolTest;

  @Prop()
  student_name: string;

  @Prop()
  student_email: string;

  @Prop()
  points_scored: number;

  @Prop()
  average: number;

  @Prop()
  question_quantity: number;

  @Prop()
  question_success: number;

  @Prop()
  question_total_amount: number;

  @Prop()
  questions: StudentQuestions[];
}

export class StudentQuestions {
  @Prop({
    ref: Question.name,
    type: SchemaType.Types.ObjectId,
  })
  question: Question;

  @Prop({
    type: SchemaType.Types.Mixed,
  })
  questions: Record<string, string>;

  @Prop()
  question_selected: string;

  @Prop()
  question_correct: string;

  @Prop()
  question_amount: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
