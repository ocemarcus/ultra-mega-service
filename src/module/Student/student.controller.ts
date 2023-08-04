import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Get('/result')
  async findQuestionsResult() {
    return await this.appService.findQuestionsResult();
  }
  @Get('/result/:id')
  async findResultById(@Param() param: any) {
    const id = param.id as string;
    return await this.appService.findResultById(id);
  }

  @Post()
  async save(@Body() body: StudentDto) {
    const build = this.build(body);
    await this.appService.save(build);
  }
  private build(body: StudentDto) {
    return {
      questions: body.questions,
      schoolTestId: body.schoolTestId,
      student_name: body.student_name,
      student_email: body.student_email,
    };
  }
}
