import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto, QuestionUpdateDto } from './dto/question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly appService: QuestionService) {}

  @Get()
  async find() {
    try {
      return await this.appService.find();
    } catch (error) {
      console.log(error);
    }
  }
  @Get('/question/:schoolTestId')
  async findQuestionsStudent(@Param() param: any) {
    try {
      const schoolTestId = param.schoolTestId as string;
      return await this.appService.findQuestionsStudent(schoolTestId);
    } catch (error) {}
  }
  @Get(':id')
  async findById(@Param() param: any) {
    try {
      return await this.appService.findById(param.id);
    } catch (error) {
      console.log(error);
    }
  }
  @Post()
  async save(@Body() body: QuestionDto) {
    try {
      const build = this.build(body);
      await this.appService.save(build);
    } catch (error) {
      console.log(error);
    }
  }
  @Put(':id')
  async updateById(@Body() body: QuestionUpdateDto, @Param() param: any) {
    try {
      const build = this.build(body);
      await this.appService.updateById(build, param.id);
    } catch (error) {
      console.log(error);
    }
  }
  private build(body: any) {
    return {
      questions: body.questions,
      schoolTest: body.schoolTestId,
      question_name: body.question_name,
      question_amount: body.question_amount,
      question_correct: body.question_correct,
    } as any;
  }
}
