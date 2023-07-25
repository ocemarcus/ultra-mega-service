import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  schoolTestId: string;

  @IsString()
  @IsNotEmpty()
  student_name: string;

  @IsEmail()
  @IsNotEmpty()
  student_email: string;

  @IsArray()
  questions: StudentQuestionsDto[];
}

export class StudentQuestionsDto {
  @IsString()
  questionId: string;

  @IsObject()
  @IsNotEmpty()
  questions: Record<string, string>;

  @IsString()
  @IsNotEmpty()
  question_selected: string;
}
