import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryController } from './questionary.controller';
import { EntitiesModule } from '@/entities/entities.module';

@Module({
  imports: [EntitiesModule],
  controllers: [QuestionaryController],
  providers: [QuestionaryService],
  //exports: [QuestionaryService],
})
export class QuestionaryModule {}
