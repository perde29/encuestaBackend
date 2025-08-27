import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface UserFindOne {
  id?: number;
  email?: string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const dat = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (dat) throw new NotFoundException('El correo ya esta registrado');
    const post = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(post);

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id: id } })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );
    if (!user)
      throw new NotFoundException('Post does not exist or unauthorize');
    return await user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userEntity?: User) {
    const user = await this.findOne(id, userEntity);
    const editUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(editUser);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async findValidateOne(data: UserFindOne) {
    // const post = this.userRepository.findOne({ where: { email } });
    // console.log(data);
    // if (!post) throw new NotFoundException('Post does not exist');
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
