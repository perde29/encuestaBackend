import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryQuestionsService } from './category-questions.service';
//import { CreateCategoryQuestionDto } from './dto/create-category-question.dto';
//import { UpdateCategoryQuestionDto } from './dto/update-category-question.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CategoryQuestions')
@Controller('category-questions')
export class CategoryQuestionsController {
  constructor(
    private readonly categoryQuestionsService: CategoryQuestionsService,
  ) {}

  @Get(':id')
  async findCategoryQuestions(@Param('id') id: number) {
    return this.categoryQuestionsService.getQuestionsByCategory(id);
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
