import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { Category } from './category.entity';
import { Questionary } from './questionary.entity';
import { Questions } from './questions.entity';
import { Alternative } from './alternative.entity';
import { Customer } from './customer.entity';
import { CustomerSurvey } from './customer-survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Questionary,
      Questions,
      Alternative,
      Customer,
      CustomerSurvey,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
