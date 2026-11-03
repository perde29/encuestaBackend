import { Injectable } from '@nestjs/common';
import { CreateCustomerSurveyDto } from './dto/create-customer-survey.dto';
// import { UpdateCustomerSurveyDto } from './dto/update-customer-survey.dto';

@Injectable()
export class CustomerSurveyService {
  /*
  create(createCustomerSurveyDto: CreateCustomerSurveyDto) {
    return 'This action adds a new customerSurvey';
  }

  findAll() {
    return `This action returns all customerSurvey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerSurvey`;
  }

  update(id: number, updateCustomerSurveyDto: UpdateCustomerSurveyDto) {
    return `This action updates a #${id} customerSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerSurvey`;
  }
  */

  saveCustomerSurvey(createCustomerSurveyDto: CreateCustomerSurveyDto) {
    console.log('createCustomerSurveyDto', createCustomerSurveyDto);
  }
}
