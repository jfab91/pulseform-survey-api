import { Type } from 'class-transformer';
import { IsArray, IsMongoId, ValidateNested } from 'class-validator';

class AnswerDto {
  @IsMongoId()
  questionId: string;

  value: any;
}

export class CreateResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
