import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from './users.entity';
import { UserRole } from './users.interface';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(GqlAuthGuard, RolesGuard)
  // @Roles([UserRole.ADMIN])
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Query(() => User)
  async userByName(@Args('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByName(username);
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async whoami(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Mutation(() => User)
  deleteUser(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
