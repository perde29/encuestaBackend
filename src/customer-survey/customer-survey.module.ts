import { Module } from '@nestjs/common';
import { CustomerSurveyService } from './customer-survey.service';
import { CustomerSurveyController } from './customer-survey.controller';

@Module({
  controllers: [CustomerSurveyController],
  providers: [CustomerSurveyService],
})
export class CustomerSurveyModule {}
