import { Controller, Get, Param } from '@nestjs/common';
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
}
