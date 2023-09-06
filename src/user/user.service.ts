import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const name = createUserDto.name;
    const user = this.userRepository.create({ name });
    await this.userRepository.save(user);
    return user;
  }

  findAll() {
    return `This action returns all usedar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} useraaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
