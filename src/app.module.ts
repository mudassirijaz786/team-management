import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
      port: 5432,
      host:
        process.env.POSTGRES_HOST || 'ec2-23-20-205-19.compute-1.amazonaws.com',
      database: process.env.POSTGRES_DATABASE || 'd6afis5v152uen',
      username: process.env.POSTGRES_USERNAME || 'cqxdmqmmerzscz',
      password:
        process.env.POSTGRES_PASSWORD ||
        '48eba795ff802f839562b4e936949a4801d5c543d921d2ba953abdd329138654',
    }),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
