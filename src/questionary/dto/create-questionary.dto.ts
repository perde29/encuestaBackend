import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateQuestionaryDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsIn([1, 0], { message: `El State no es valido` })
  status: number;

  @ApiProperty()
  @IsNumber()
  orden: number;
}
