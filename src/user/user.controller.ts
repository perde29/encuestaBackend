import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserRegistrationDto } from './dto';
import { Auth, User } from 'src/common/decorators';
import { AppResources, AppRoles } from 'src/app.roles';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { User as UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Post()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.USER,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(+id);
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      message: 'Peticion correcta',
      data,
    };
  }

  @Patch(':id')
  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResources.USER,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity,
  ) {
    let data;

    if (
      this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted
    ) {
      // admin
      data = await this.usersService.update(+id, updateUserDto);
    } else {
      // usuario
      const { roles, ...rest } = updateUserDto;
      data = await this.usersService.update(+id, rest, user);
    }

    return { message: 'User edit', data };
  }

  /*::: register :::*/
  @Post('register')
  async Registration(@Body() dto: UserRegistrationDto) {
    const data = await this.usersService.create({
      ...dto,
      roles: [AppRoles.ROL_USUARIO],
    });
    return { message: 'User registrado', data };
  }

  @Delete(':id')
  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.USER,
  })
  async remove(@Param('id') id: number) {
    return await this.usersService.remove(+id);
  }
}
