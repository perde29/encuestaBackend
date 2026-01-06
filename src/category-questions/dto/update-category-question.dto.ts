import { PartialType } from '@nestjs/swagger';
import { CreateCategoryQuestionDto } from './create-category-question.dto';

export class UpdateCategoryQuestionDto extends PartialType(CreateCategoryQuestionDto) {}
