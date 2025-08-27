import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionaryDto } from './dto/create-questionary.dto';
import { UpdateQuestionaryDto } from './dto/update-questionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionary } from '@/entities/questionary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionaryService {
  constructor(
    @InjectRepository(Questionary)
    private readonly questionaryRepository: Repository<Questionary>,
  ) {}

  async create(createQuestionaryDto: CreateQuestionaryDto, userId) {
    const dat = await this.questionaryRepository.findOne({
      where: { title: createQuestionaryDto.title },
    });

    if (dat)
      throw new NotFoundException(
        'Ya existe un Cuestionario con el mismo nombre.',
      );

    const post = this.questionaryRepository.create({
      ...createQuestionaryDto,
      userInsert: userId,
    });
    const questionary = await this.questionaryRepository.save(post);
    delete questionary.userInsert;
    delete questionary.dateInsert;
    return questionary;
  }

  async findAll(): Promise<Questionary[]> {
    return await this.questionaryRepository.find();
  }

  async findOne(id: number) {
    const post = this.questionaryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Questionary does not exist');
    return await post;
  }

  async update(id: number, updateQuestionaryDto: UpdateQuestionaryDto) {
    const post = this.questionaryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Questionary does not exist');
    const editPost = Object.assign(post, updateQuestionaryDto);
    return await this.questionaryRepository.save(editPost);
  }

  async remove(id: number) {
    return await this.questionaryRepository.delete(id);
  }
}
