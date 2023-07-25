import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { SchoolTest, SchoolTestDocument } from '../../schemas/SchoolTest';
import { SchoolTestDto } from './dto/schoolTest.dto';

@Injectable()
export class SchoolTestService {
  constructor(
    @InjectModel(SchoolTest.name)
    private readonly schoolTestModule: Model<SchoolTestDocument>,
  ) {}
  async find() {
    return await this.schoolTestModule.find();
  }
  async findById(id: string) {
    return await this.schoolTestModule.findById(id);
  }
  async save(body: SchoolTestDto) {
    const instance = new this.schoolTestModule({
      name: body.name,
    });
    await instance.save();
  }
  async updateById(body: SchoolTestDto, _id: string) {
    await this.schoolTestModule.updateMany({ _id }, { $set: body });
  }
}
