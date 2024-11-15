import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import TypeOrmConfigService from './typeorm.config';

dotenv.config();

const configService = new ConfigService();

const typeOrmConfigService = new TypeOrmConfigService(configService);
const dataSource = new DataSource({
  ...typeOrmConfigService.createTypeOrmOptions(),
  entities: [User],
});

export default dataSource;
