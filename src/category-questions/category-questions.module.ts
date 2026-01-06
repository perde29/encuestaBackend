import { Module } from '@nestjs/common';
import { CategoryQuestionsService } from './category-questions.service';
import { CategoryQuestionsController } from './category-questions.controller';

@Module({
  controllers: [CategoryQuestionsController],
  providers: [CategoryQuestionsService],
})
export class CategoryQuestionsModule {}
