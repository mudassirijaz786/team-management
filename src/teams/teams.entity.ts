import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/users.entity';

@Entity()
@ObjectType()
export class Team {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable()
  @Field(() => [User], { nullable: true })
  members: Promise<User[]>;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
