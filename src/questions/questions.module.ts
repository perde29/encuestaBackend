import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { EntitiesModule } from '@/entities/entities.module';
import { CategoryQuestionsModule } from 'src/category-questions/category-questions.module';
import { AlternativeModule } from 'src/alternative/alternative.module';

@Module({
  imports: [EntitiesModule, CategoryQuestionsModule, AlternativeModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
