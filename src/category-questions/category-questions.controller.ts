import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CategoryQuestionsService } from './category-questions.service';
//import { CreateCategoryQuestionDto } from './dto/create-category-question.dto';
//import { UpdateCategoryQuestionDto } from './dto/update-category-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { QuestionsService } from 'src/questions/questions.service';
import { Auth, User } from 'src/common/decorators';
import { UpdateQuestionDto } from 'src/questions/dto/update-question.dto';
import { User as UserEntity } from 'src/entities/user.entity';
import { AppResources } from 'src/app.roles';

@ApiTags('CategoryQuestions')
@Controller('category-questions')
export class CategoryQuestionsController {
  constructor(
    private readonly categoryQuestionsService: CategoryQuestionsService,
    private readonly questionsService: QuestionsService,
  ) {}

  @Get(':id')
  async findCategoryQuestions(@Param('id') id: number) {
    return this.categoryQuestionsService.getQuestionsByCategory(id);
  }

  @Patch(':id')
  @Auth({
    possession: 'any',
    action: 'update',
    resource: AppResources.CATEGORYQUESTIONS,
  })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryQuestionDto: UpdateQuestionDto,
    @User() user: UserEntity,
  ) {
    const userId = user.id ? user.id : null;
    return await this.questionsService.update(
      id,
      updateCategoryQuestionDto,
      userId,
    );
  }

  /*
  @Post()
  create(@Body() createCategoryQuestionDto: any) {
    return this.categoryQuestionsService.create(createCategoryQuestionDto);
  }
  */

  /*
  @Get()
  findAll() {
    return this.categoryQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryQuestionDto: UpdateCategoryQuestionDto,
  ) {
    return this.categoryQuestionsService.update(+id, updateCategoryQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryQuestionsService.remove(+id);
  }
  */
}
