import { Module } from '@nestjs/common';
import { SchoolTestController } from './schoolTest.controller';
import { SchoolTestService } from './schoolTest.service';
import { MongooseModule } from '@nestjs/mongoose';

import { SchoolTest, SchoolTestSchema } from '../../schemas/SchoolTest';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SchoolTest.name,
        schema: SchoolTestSchema,
      },
    ]),
  ],
  controllers: [SchoolTestController],
  providers: [SchoolTestService],
})
export class SchoolTestModule {}
