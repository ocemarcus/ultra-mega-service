import {
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsString,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  schoolTestId: string;

  @IsString()
  @IsNotEmpty()
  question_name: string;

  @IsNumberString()
  @IsNotEmpty()
  question_amount: number;

  @IsObject()
  @IsNotEmpty()
  questions: Record<string, string>;

  @IsString()
  @IsNotEmpty()
  question_correct: string;
}

export class QuestionUpdateDto extends PartialType(QuestionDto) {}
