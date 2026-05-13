import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryController } from './questionary.controller';
import { EntitiesModule } from '@/entities/entities.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { AlternativeModule } from 'src/alternative/alternative.module';

@Module({
  imports: [EntitiesModule, QuestionsModule, AlternativeModule],
  controllers: [QuestionaryController],
  providers: [QuestionaryService],
  //exports: [QuestionaryService],
})
export class QuestionaryModule {}
