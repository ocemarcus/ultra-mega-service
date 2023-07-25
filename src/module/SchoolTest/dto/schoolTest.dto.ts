import { IsNotEmpty, IsString } from 'class-validator';
export class SchoolTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
