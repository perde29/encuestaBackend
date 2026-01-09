import { Module } from '@nestjs/common';
import { CategoryQuestionsService } from './category-questions.service';
import { CategoryQuestionsController } from './category-questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/entities/category.entity';
import { Questions } from '@/entities/questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Questions])],
  controllers: [CategoryQuestionsController],
  providers: [CategoryQuestionsService],
})
export class CategoryQuestionsModule {}
