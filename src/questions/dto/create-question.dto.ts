import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { QuestionType } from '../enums';

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'QuestionType',
  })
  @IsEnum(QuestionType)
  type: string;

  @ApiProperty()
  @IsBoolean()
  required?: boolean;

  @ApiProperty({ required: false, type: [String] })
  @ValidateIf((o) => o.type === QuestionType.MULTIPLE_CHOICE)
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}
