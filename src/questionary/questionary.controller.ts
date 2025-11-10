import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Auth, User } from 'src/common/decorators';
import { AppResources } from 'src/app.roles';
import { User as UserEntity } from 'src/entities/user.entity';
import { Questionary } from '@/entities/questionary.entity';

import { QuestionaryService } from './questionary.service';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';

@Controller('questionary')
export class QuestionaryController {
  constructor(private readonly questionaryService: QuestionaryService) {}

  @Post()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.QUESTIONARY,
  })
  async create(
    @Body() createQuestionaryDto: CreateQuestionaryDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.questionaryService.create(createQuestionaryDto, userId);
  }

  @Get()
  async findAll(): Promise<Questionary[]> {
    return await this.questionaryService.findAll();
  }

  @Get('lastorden')
  async lastOrden() {
    return await this.questionaryService.lastOrden();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionaryService.findOne(+id);
  }

  @Patch(':id')
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.QUESTIONARY,
  })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionaryDto: UpdateQuestionaryDto,
  ) {
    return await this.questionaryService.update(+id, updateQuestionaryDto);
  }

  @Patch('order/:id')
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.QUESTIONARY,
  })
  async updateOrnde(
    @Param('id') id: string,
    @Body() updateQuestionaryDto: UpdateQuestionaryDto,
  ) {
    /*
     console.log(id);
     console.log(updateQuestionaryDto);
    */

    return await this.questionaryService.updateOrden(+id, updateQuestionaryDto);
  }

  @Delete(':id')
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResources.QUESTIONARY,
  })
  async remove(@Param('id') id: string) {
    return await this.questionaryService.remove(+id);
  }
}
