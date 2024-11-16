import { Dependencies, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import TypeOrmConfigService from './typeorm.config';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { Train } from './entities/train.entity';
import { TrainController } from './controllers/train.controller';
import { TrainService } from './services/train.service';

@Dependencies(DataSource)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([User, Train]),
  ],
  controllers: [AppController, UserController, TrainController],
  providers: [AppService, UserService, TrainService],
})
export class AppModule {}
