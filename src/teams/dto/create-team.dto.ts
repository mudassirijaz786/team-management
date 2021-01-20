import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, MinLength } from 'class-validator';

import { Team } from '../teams.entity';

@InputType()
export class TeamInput implements Partial<Team> {
  @ApiProperty()
  @Field({ nullable: false })
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;
}
