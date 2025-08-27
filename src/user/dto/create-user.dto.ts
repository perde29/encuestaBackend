import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/class-transformer';
import { AppRoles } from 'src/app.roles';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsArray()
  @IsEnum(AppRoles, { each: true, message: `must be a valid role value ` })
  @Type(() => String)
  roles: AppRoles[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  password?: string;
}
