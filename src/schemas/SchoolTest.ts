import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchoolTestDocument = SchoolTest & Document;

@Schema()
export class SchoolTest {
  @Prop()
  name: string;
}

export const SchoolTestSchema = SchemaFactory.createForClass(SchoolTest);
