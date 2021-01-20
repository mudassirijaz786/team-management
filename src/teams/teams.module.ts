import { TeamsService } from './teams.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { UsersModule } from 'src/users/users.module';
import { TeamResolver } from '../teams/teams.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), forwardRef(() => UsersModule)],
  providers: [TeamsService, TeamResolver],
  exports: [TeamsService],
})
export class TeamsModule {}
