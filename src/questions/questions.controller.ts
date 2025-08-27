import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Auth, User } from 'src/common/decorators';
import { AppResources } from 'src/app.roles';
import { User as UserEntity } from 'src/entities/user.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.QUESTIONS,
  })
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.questionsService.create(createQuestionDto, userId);
  }

  @Get()
  async findAll() {
    return await this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.QUESTIONS,
  })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.questionsService.update(+id, updateQuestionDto, userId);
  }

  @Delete(':id')
  @Auth({
    possession: 'any',
    action: 'delete',
    resource: AppResources.QUESTIONS,
  })
  async remove(@Param('id') id: string) {
    return await this.questionsService.remove(+id);
  }
}
