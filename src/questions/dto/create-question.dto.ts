import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  questionaryId: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  inputType: number;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsNumber()
  allSectors: number;

  // questionnaire_response
  @ApiProperty()
  @IsNumber()
  questionnaireResponse: number;
}
