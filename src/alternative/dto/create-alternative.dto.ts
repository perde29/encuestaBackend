import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAlternativeDto {
  @ApiProperty()
  @IsNumber()
  questionsId: number;

  @ApiProperty()
  @IsString()
  title: string;
}
