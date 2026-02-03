//import { CategoryQuestions } from '@/entities/category-questions.entity';
import { Category } from '@/entities/category.entity';
import { Questions } from '@/entities/questions.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoryQuestionsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    private readonly dataSource: DataSource,
  ) {}

  async getQuestionsByCategory(id: number) {
    const questions = await this.questionsRepository.findOne({
      where: { id: id, categories: { state: 1 } },
      relations: ['categories'],
    });

    if (!questions) {
      throw new Error('Categoría no encontrada');
    }
    return questions.categories;
  }

  async saveCategoryQuestions(questionaryId: number, categories: number[]) {
    await this.dataSource.transaction(async (manager) => {
      // 1️⃣ Obtener relaciones actuales
      const question = await manager.findOne(Questions, {
        where: { id: questionaryId },
        relations: ['categories'],
      });

      if (!question) {
        throw new NotFoundException('Pregunta no encontrada');
      }

      // 2️⃣ Eliminar TODAS las relaciones existentes
      if (question.categories.length > 0) {
        await manager
          .createQueryBuilder()
          .relation(Questions, 'categories')
          .of(questionaryId)
          .remove(question.categories);
      }

      // 3️⃣ Insertar nuevas relaciones
      if (categories.length > 0) {
        const categoriesEntities = await manager.findBy(Category, {
          id: In(categories),
        });

        await manager
          .createQueryBuilder()
          .relation(Questions, 'categories')
          .of(questionaryId)
          .add(categoriesEntities);
      }
    });
  }
}
