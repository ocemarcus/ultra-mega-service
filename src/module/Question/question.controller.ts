import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto, QuestionUpdateDto } from './dto/question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly appService: QuestionService) {}

  @Get()
  async find() {
    return await this.appService.find();
  }
  @Get('/question/:schoolTestId')
  async findQuestionsStudent(@Param() param: any) {
    const schoolTestId = param.schoolTestId as string;
    return await this.appService.findQuestionsStudent(schoolTestId);
  }
  @Get(':id')
  async findById(@Param() param: any) {
    return await this.appService.findById(param.id);
  }
  @Post()
  async save(@Body() body: QuestionDto) {
    const build = this.build(body);
    await this.appService.save(build);
  }
  @Put(':id')
  async updateById(@Body() body: QuestionUpdateDto, @Param() param: any) {
    const build = this.build(body);
    await this.appService.updateById(build, param.id);
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
