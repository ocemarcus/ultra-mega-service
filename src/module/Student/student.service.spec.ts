import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument } from '../../schemas/Student';
import { QuestionDocument } from '../../schemas/Question';
import { StudentDto } from './dto/student.dto';

describe('StudentService', () => {
  let studentService: StudentService;
  let studentModel: Model<StudentDocument>;
  let questionModel: Model<QuestionDocument>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getModelToken('Question'),
          useValue: Model,
        },
        {
          provide: getModelToken('Student'),
          useValue: Model,
        },
      ],
    }).compile();

    studentService = app.get<StudentService>(StudentService);
    studentModel = app.get<Model<StudentDocument>>(getModelToken('Student'));
    questionModel = app.get<Model<QuestionDocument>>(getModelToken('Question'));

    jest.clearAllMocks();
  });
  describe('findResultById', () => {
    it('should return student', async () => {
      const populate = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({ exec: jest.fn() }),
      });
      const spy = jest
        .spyOn(studentModel, 'findById')
        .mockImplementation(() => ({ populate } as any));

      await studentService.findResultById('id');
      expect(spy).toBeCalled();
    });
  });
  describe('find', () => {
    it('should return student array', async () => {
      const populate = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValueOnce([]),
      });
      const spy = jest
        .spyOn(questionModel, 'find')
        .mockImplementation(() => ({ populate } as any));

      await studentService.find('id');
      expect(spy).toBeCalled();
    });
  });
  describe('findQuestionsResult', () => {
    it('should return findQuestionsResult array', async () => {
      const select = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue([]),
        }),
      });
      const spy = jest
        .spyOn(questionModel, 'find')
        .mockImplementation(() => ({ select } as any));

      await studentService.findQuestionsResult();
      expect(spy).toBeCalled();
    });
  });
  describe('findQuestionsById', () => {
    it('should return findQuestionsById object', async () => {
      const spy = jest.spyOn(questionModel, 'find').mockResolvedValue([
        {
          toObject: jest.fn().mockReturnValue({
            _id: 'id',
          }),
        },
      ]);

      const response = await studentService.findQuestionsById(['id']);
      const question: Record<string, any> = {};
      question['id'] = { _id: 'id' };

      expect(spy).toBeCalled();
      expect(response).toEqual(question);
    });
  });
  describe('save', () => {
    it('should return save', async () => {
      const body: StudentDto = {
        schoolTestId: 'id',
        student_name: 'student',
        student_email: 'student@gmail.com',
        questions: [],
      };

      const questionByIdSpy = jest
        .spyOn(studentService, 'findQuestionsById')
        .mockResolvedValue({});

      const saveStudentSpy = jest
        .spyOn(studentService, 'saveStudent')
        .mockResolvedValue();

      await studentService.save(body);

      const save = {
        average: NaN,
        points_scored: 0,
        question_quantity: 0,
        question_success: 0,
        question_total_amount: 0,
        questions: [],
        schoolTest: 'id',
        student_email: 'student@gmail.com',
        student_name: 'student',
      };

      expect(questionByIdSpy).toHaveBeenCalled();
      expect(saveStudentSpy).toHaveBeenLastCalledWith(save);
    });
  });
});
