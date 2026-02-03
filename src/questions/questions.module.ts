import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { EntitiesModule } from '@/entities/entities.module';
import { CategoryQuestionsService } from 'src/category-questions/category-questions.service';

@Module({
  imports: [EntitiesModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, CategoryQuestionsService],
})
export class QuestionsModule {}
