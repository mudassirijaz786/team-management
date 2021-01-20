import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/users.entity';
import { UsersModule } from '../users/users.module';

import { AuthOptionsService } from './auth-options.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'kwan$0',
        signOptions: {
          expiresIn: 86400,
        },
      }),
    }),
    PassportModule.registerAsync({
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
