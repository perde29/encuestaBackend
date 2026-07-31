import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from '@/entities/questions.entity';
import { DataSource, Repository } from 'typeorm';
import { CustomerSurvey } from '@/entities/customer-survey.entity';
import { CategoryQuestionsService } from 'src/category-questions/category-questions.service';
import { Customer } from '../entities/customer.entity';
import { AlternativeService } from 'src/alternative/alternative.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly dataSource: DataSource,
    private readonly categoryQuestionsService: CategoryQuestionsService,
    private readonly alternativeService: AlternativeService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto, userId) {
    const dat = await this.questionsRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.questionary', 'questionary')
      .where({
        title: createQuestionDto.title,
        questionary: createQuestionDto.questionaryId,
      })
      .getOne();

    if (dat)
      throw new NotFoundException(
        'Ya existe la misma pregnta en el cuestionario.',
      );

    const post = this.questionsRepository.create({
      ...createQuestionDto,
      questionary: { id: createQuestionDto.questionaryId },
      userInsert: userId,
    });
    const questions = await this.questionsRepository.save(post);

    await this.categoryQuestionsService.saveCategoryQuestions(
      questions.id,
      createQuestionDto.categories,
    );

    return questions;
  }

  async findAll() {
    return await this.questionsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.questionsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Questions does not exit');
    }
    return post;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto, userId) {
    const post = await this.questionsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Questions does not exit');
    }
    const editPost = Object.assign(post, updateQuestionDto, {
      userUpdate: userId,
    });

    const questions = await this.questionsRepository.save(editPost);

    await this.categoryQuestionsService.saveCategoryQuestions(
      questions.id,
      updateQuestionDto.categories,
    );

    return questions;
  }

  async remove(id: number) {
    return await this.questionsRepository.delete(id);
  }

  async getQuestionsQuestionaryId(id: number) {
    const subQuery = this.dataSource
      .createQueryBuilder()
      .subQuery()
      .select('COUNT(cs.id)')
      .from(CustomerSurvey, 'cs')
      .where('cs.questions = q.id')
      .getQuery();

    return await this.questionsRepository
      .createQueryBuilder('q')
      .select([
        'q.id AS id',
        'q.title AS title',
        `(${subQuery}) AS cant_questions`,
      ])
      .addSelect(
        `
      CASE 
        WHEN q.input_type = 1 THEN '[ Text ]'
        WHEN q.input_type = 2 THEN '[ Text Area ]'
        WHEN q.input_type = 3 THEN '[ Select ]'
        WHEN q.input_type = 4 THEN '[ Radio ]'
        WHEN q.input_type = 5 THEN '[ Checkbox ]'
        WHEN q.input_type = 6 THEN '[ Date ]'
        WHEN q.input_type = 7 THEN '[ Datetime Local ]'
        WHEN q.input_type = 8 THEN '[ Email ]'
        WHEN q.input_type = 9 THEN '[ Number ]'
        WHEN q.input_type = 10 THEN '[ Time ]'
        ELSE 'Ninguno de los anteriores'
      END
    `,
        'input_type',
      )
      .leftJoin('q.questionary', 'qy')
      .where('qy.id = :id', { id })
      .getRawMany();
    /**/
  }

  async removeByQuestionaryId(id: number) {
    return await this.questionsRepository
      .createQueryBuilder('questions')
      .delete()
      .where('questionary_id = :id', { id })
      .execute();
  }

  async getTitleCustomer() {
    return await this.questionsRepository
      .createQueryBuilder('q')
      .select('q.id', 'id')
      .addSelect('q.title', 'title')
      .where('q.questionnaire_response = :response', { response: 1 })
      .getRawMany();
  }

  async getRegisterCustomer() {
    const datos = await this.customerRepository
      .createQueryBuilder('c')
      .innerJoin('c.customerSurvey', 'cs')
      .select('cs.id', 'id')
      .addSelect('cs.customer_id', 'customer_id')
      .addSelect('cs.questions_id', 'questions_id')
      .addSelect('cs.type_alternative', 'type_alternative')
      .addSelect('cs.answer', 'answer')
      .addSelect('cs.id_alternative', 'id_alternative')
      .addSelect(
        `(SELECT title FROM category WHERE id = c.category_id)`,
        'category',
      )
      .where(
        "cs.questions_id IN (SELECT id FROM questions WHERE questionnaire_response = '1')",
      )
      .orderBy('c. category_id', 'ASC')
      .getRawMany();

    const registro: Record<string, Record<string, unknown>> = {};

    for (const reg of datos) {
      if (!registro[reg.customer_id]) {
        registro[reg.customer_id] = {};
      }

      if (reg.type_alternative == '3') {
        registro[reg.customer_id][reg.questions_id] =
          await this.alternativeService.getAlternativeTitle(reg.id_alternative);
      } else {
        registro[reg.customer_id][reg.questions_id] = reg.answer;
      }

      registro[reg.customer_id]['cat'] = reg.category;
      registro[reg.customer_id]['customer_id'] = reg.customer_id;
    }

    /*
     console.log(registro);
     console.log(Object.values(registro));
    */

    return registro;
  }
}
