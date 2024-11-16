import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Train } from './entities/train.entity';

dotenv.config();

@Injectable()
class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      host: String(this.configService.get<string>('DB_HOST')),
      port: Number(this.configService.get<number>('DB_PORT')),
      username: String(this.configService.get<string>('DB_USERNAME')),
      password: String(this.configService.get<string>('DB_PASSWORD')),
      database: String(this.configService.get<string>('DB_NAME')),
      entities: [User, Train],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: true,
    };
  }
}

export default TypeOrmConfigService;
