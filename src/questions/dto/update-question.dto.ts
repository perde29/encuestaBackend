import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(
  OmitType(CreateQuestionDto, ['questionaryId'] as const),
) {}
