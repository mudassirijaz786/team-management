import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Team } from '../teams/teams.entity';
import { TeamsService } from '../teams/teams.service';
import { UsersService } from '../users/users.service';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { User } from '../users/users.entity';
import { TeamInput } from '../teams/dto/create-team.dto';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/users/users.interface';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Query(() => [Team], { name: 'teams', nullable: true })
  async getTeams() {
    return this.teamsService.findAll();
  }

  @Query(() => Team, { name: 'team', nullable: true })
  async getTeamById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.teamsService.findById(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Mutation(() => Team, { name: 'createTeam' })
  async createTeam(@Args('data') input: TeamInput) {
    return this.teamsService.createTeam(input);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Mutation(() => Team, { nullable: true })
  async addMember(
    @Args({ name: 'teamId', type: () => Int }) teamId: number,
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.teamsService.addMember(teamId, userId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Mutation(() => Team, { nullable: true })
  async removeMember(
    @Args({ name: 'teamId', type: () => Int }) teamId: number,
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return this.teamsService.removeMember(teamId, userId);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  @Mutation(() => Team)
  deleteTeam(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.teamsService.delete(id);
  }

  // if members will be asked this resolved field will execute
  @ResolveField('members', () => [User], { nullable: true })
  async getMembers(@Parent() team: Team) {
    return await team.members;
  }
}
