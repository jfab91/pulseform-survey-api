import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { AnswerDto } from './answer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
