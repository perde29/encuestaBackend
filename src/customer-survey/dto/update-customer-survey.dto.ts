import { PartialType } from '@nestjs/swagger';
import { CreateCustomerSurveyDto } from './create-customer-survey.dto';

export class UpdateCustomerSurveyDto extends PartialType(
  CreateCustomerSurveyDto,
) {}
