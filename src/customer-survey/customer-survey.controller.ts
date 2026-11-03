import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerSurveyService } from './customer-survey.service';
import { CreateCustomerSurveyDto } from './dto/create-customer-survey.dto';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/common/decorators';
// import { UpdateCustomerSurveyDto } from './dto/update-customer-survey.dto';

@Controller('customer-survey')
export class CustomerSurveyController {
  constructor(private readonly customerSurveyService: CustomerSurveyService) {}

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.CUSTOMERSURVEY,
  })
  @Post('save-customer-survey')
  saveCustomerSurvey(@Body() createCustomerSurveyDto: CreateCustomerSurveyDto) {
    return this.customerSurveyService.saveCustomerSurvey(
      createCustomerSurveyDto,
    );
  }
}
