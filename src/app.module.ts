import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

import { DataSource } from 'typeorm';
import {
  DATABASE_DATABASE,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './config/constants';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { EntitiesModule } from './entities/entities.module';
import { QuestionaryModule } from './questionary/questionary.module';
import { QuestionsModule } from './questions/questions.module';
import { AlternativeModule } from './alternative/alternative.module';
import { CategoryQuestionsModule } from './category-questions/category-questions.module';

// import config from './config/config';
@Module({
  imports: [
    EntitiesModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //  load: [config],
      envFilePath: '.env',
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DATABASE_HOST),
        port: configService.get<number>(DATABASE_PORT),
        username: configService.get<string>(DATABASE_USERNAME),
        password: configService.get<string>(DATABASE_PASSWORD),
        database: configService.get<string>(DATABASE_DATABASE),
        entities: [
          // __dirname + '/**/*.entity{.ts,.js}',
          __dirname + './**/**/*entity{.ts,.js}',
          __dirname + './entities/*entity{.ts,.js}',
        ],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        logger: 'file',
      }),
    }),
    AccessControlModule.forRoles(roles),
    QuestionaryModule,
    QuestionsModule,
    AlternativeModule,
    CategoryQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
