import { TypeOrmModule } from '@db/typeorm.module';
import { UserModule } from '@entities/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule, UserModule, TypeOrmModule],
})
export class AppModule {}
