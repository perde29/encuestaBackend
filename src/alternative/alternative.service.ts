import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlternativeDto } from './dto/create-alternative.dto';
import { UpdateAlternativeDto } from './dto/update-alternative.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alternative } from '@/entities/alternative.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AlternativeService {
  constructor(
    @InjectRepository(Alternative)
    private readonly alternativeRepository: Repository<Alternative>,
  ) {}

  async create(createAlternativeDto: CreateAlternativeDto, userId) {
    const dat = await this.alternativeRepository
      .createQueryBuilder('alternative')
      .leftJoin('alternative.questions', 'questions')
      .where({
        questions: createAlternativeDto.questionsId,
        title: createAlternativeDto.title,
      })
      .getOne();

    if (dat)
      throw new NotFoundException('Ya exite esa alternativa para la pregunta.');

    const post = this.alternativeRepository.create({
      ...createAlternativeDto,
      questions: { id: createAlternativeDto.questionsId },
      userInsert: userId,
    });

    const saved = await this.alternativeRepository.save(post);
    //const instance = new Alternative();
    //Object.assign(instance, saved);

    return instanceToPlain(saved);
  }

  async findAll(questionsId: number) {
    const dat = await this.alternativeRepository
      .createQueryBuilder('alternative')
      .innerJoin('alternative.questions', 'questions')
      .where({
        questions: questionsId,
      })
      .getMany();
    return await dat;
  }

  async findOne(id: number) {
    const post = await this.alternativeRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Alternative does not exit');
    return post;
  }

  async update(id: number, updateAlternativeDto: UpdateAlternativeDto, userId) {
    const post = await this.alternativeRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Alternative does not exit');

    const editPost = Object.assign(post, updateAlternativeDto, {
      userUpdate: userId,
    });

    const alternative = await this.alternativeRepository.save(editPost);

    return alternative;
  }

  async remove(id: number) {
    return await this.alternativeRepository.delete(id);
  }
}
