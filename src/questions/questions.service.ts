import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from '@/entities/questions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
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
}
