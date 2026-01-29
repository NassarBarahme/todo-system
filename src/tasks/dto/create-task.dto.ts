import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
