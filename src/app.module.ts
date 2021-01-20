import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'nest',
      port: 5432,
      username: 'kwanso_user',
      password: 'kwanso_password',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
