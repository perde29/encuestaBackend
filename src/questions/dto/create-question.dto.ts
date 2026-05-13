import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  questionaryId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  inputType: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  status: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  allSectors: number;

  // questionnaire_response
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  questionnaireResponse: number;

  @ApiProperty()
  @IsOptional()
  categories: [];
}
