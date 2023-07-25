import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SchoolTestService } from './schoolTest.service';
import { SchoolTestDto } from './dto/schoolTest.dto';

@Controller('school-test')
export class SchoolTestController {
  constructor(private readonly appService: SchoolTestService) {}

  @Get()
  async find() {
    try {
      return await this.appService.find();
    } catch (error) {}
  }
  @Get(':id')
  async findById(@Param() param: any) {
    try {
      const id = param.id as string;
      return await this.appService.findById(id);
    } catch (error) {}
  }
  @Post()
  async save(@Body() body: SchoolTestDto) {
    try {
      await this.appService.save(body);
    } catch (error) {
      console.log(error);
    }
  }
  @Put(':id')
  async updateById(@Body() body: SchoolTestDto, @Param() param: any) {
    try {
      const id = param.id as string;
      await this.appService.updateById(body, id);
    } catch (error) {
      console.log(error)
    }
  }
}
