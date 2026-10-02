import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class ViewsSurveyDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  orden?: number;
}
