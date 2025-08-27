import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlternativeService } from './alternative.service';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/entities/user.entity';
import { AppResources } from 'src/app.roles';

@Controller('alternative')
export class AlternativeController {
  constructor(private readonly alternativeService: AlternativeService) {}

  @Post()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.ALTERNATIVE,
  })
  async create(
    @Body() createAlternativeDto: CreateAlternativeDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.alternativeService.create(createAlternativeDto, userId);
  }

  @Get(':questionsId')
  async findAll(@Param('questionsId') questionsId: string) {
    return await this.alternativeService.findAll(+questionsId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.alternativeService.findOne(+id);
  }

  @Patch(':id')
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.ALTERNATIVE,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAlternativeDto: UpdateAlternativeDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.alternativeService.update(
      +id,
      updateAlternativeDto,
      userId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.alternativeService.remove(+id);
  }
}
