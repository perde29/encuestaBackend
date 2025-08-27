import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const post = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(post);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const post = this.categoryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Category does not exist');
    return await post;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const post = await this.categoryRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Category does not exist');
    const editPost = Object.assign(post, updateCategoryDto);
    return await this.categoryRepository.save(editPost);
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
