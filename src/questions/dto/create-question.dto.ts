import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  ValidateIf,
} from 'class-validator';

import { QuestionType } from '../enums';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: string;

  @IsBoolean()
  required?: boolean;

  @ValidateIf((o) => o.type === QuestionType.MULTIPLE_CHOICE)
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}
