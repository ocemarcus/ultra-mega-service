import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';

jest.mock('./student.service.ts');

describe('StudentController', () => {
  let studentController: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    }).compile();

    studentController = app.get<StudentController>(StudentController);
    studentService = app.get<StudentService>(StudentService);

    jest.clearAllMocks();
  });

  it('should return findQuestionsResult', async () => {
    const result: any = 'ok';
    jest.spyOn(studentService, 'findQuestionsResult').mockResolvedValue(result);
    const response = await studentController.findQuestionsResult();
    expect(response).toBe('ok');
  });
  it('should return findResultById', async () => {
    const result: any = 'id';
    jest.spyOn(studentService, 'findResultById').mockResolvedValue(result);
    const response = await studentController.findResultById('id' as any);
    expect(response).toBe('id');
  });
  it('should save student', async () => {
    const build: StudentDto = {
      schoolTestId: 'id',
      student_name: 'student',
      student_email: 'student@gmail.com',
      questions: [
        {
          questionId: 'id',
          questions: { A: 'A' },
          question_selected: 'A',
        },
      ],
    };
    const save = jest.spyOn(studentService, 'save').mockResolvedValue();
    await studentController.save(build);

    expect(save).toHaveBeenCalled();
  });
});
