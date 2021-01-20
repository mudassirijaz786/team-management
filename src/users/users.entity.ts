import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { UserRole } from './users.interface';
import { Team } from '../teams/teams.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Index({ unique: true })
  @Column()
  username: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => Int)
  @VersionColumn()
  readonly version: number;

  @Field()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.GUEST })
  role: UserRole;

  @ManyToMany(() => Team, (team) => team.members)
  @Field(() => [Team], { nullable: true })
  teams: Promise<Team[]>;
}
