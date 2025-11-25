import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuestionaryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsIn([1, 0], { message: `El State no es valido` })
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  orden?: number;
}
