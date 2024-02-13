import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: 'nest_test',
      password: 'nest_test',
      database: 'nest_test',
      entities: ['dist/entities/**/*.entity.js'],
      //   migrations: ['dist/db/migrations/**/*.js'],
      synchronize: true,
    }),
  ],
})
export class TypeOrmModule {}
