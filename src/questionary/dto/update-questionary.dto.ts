import { PartialType } from '@nestjs/swagger';
import { CreateQuestionaryDto } from './create-questionary.dto';

export class UpdateQuestionaryDto extends PartialType(CreateQuestionaryDto) {}
