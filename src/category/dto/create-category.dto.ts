import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  //  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  // @IsOptional()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250, {
    message: `El titulo debe de tener entre 1 a 250 caracteres.`,
  })
  title?: string;

  @ApiProperty()
  @IsNumber()
  @IsIn([1, 2], { message: `El State no es valido` })
  state?: number;
}
