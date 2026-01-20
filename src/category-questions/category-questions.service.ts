//import { CategoryQuestions } from '@/entities/category-questions.entity';
//import { Category } from '@/entities/category.entity';
import { Questions } from '@/entities/questions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryQuestionsService {
  constructor(
    // @InjectRepository(Category)
    // private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
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

  async update(id: number, body: any) {
    console.log(id);

    console.log(body);

    return null;
  }

  /*
  async create(createCategoryQuestionDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: createCategoryQuestionDto.id },
      relations: ['questions'],
    });

    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    return null;
  }
  */
}
