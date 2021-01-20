import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async findOneByName(username: string): Promise<User> {
    const user = await this.usersRepo.findOne({ username });
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ id });
    return user;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepo.delete({ id });
  }
}
