import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolTestService } from './schoolTest.service';
import { SchoolTestDto } from './dto/schoolTest.dto';

@Controller('school-test')
export class SchoolTestController {
  constructor(private readonly appService: SchoolTestService) {}

  @Get()
  async find() {
    return await this.appService.find();
  }
  @Get(':id')
  async findById(@Param() param: any) {
    const id = param.id as string;
    return await this.appService.findById(id);
  }
  @Post()
  async save(@Body() body: SchoolTestDto) {
    await this.appService.save(body);
  }
  @Put(':id')
  async updateById(@Body() body: SchoolTestDto, @Param() param: any) {
    const id = param.id as string;
    await this.appService.updateById(body, id);
  }
}
