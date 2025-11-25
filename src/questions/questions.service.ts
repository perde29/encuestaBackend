import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from '@/entities/questions.entity';
import { DataSource, Repository } from 'typeorm';
import { CustomerSurvey } from '@/entities/customerSurvey.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    private readonly dataSource: DataSource,
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

    // console.log(dat);
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
}
