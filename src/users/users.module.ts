import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from 'src/teams/teams.module';

import { AuthOptionsService } from '../auth/auth-options.service';

import { User } from './users.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TeamsModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
