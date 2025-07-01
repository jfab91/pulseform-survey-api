import { IsMongoId } from 'class-validator';

export class AnswerDto {
  @IsMongoId()
  questionId: string;

  value: any;
}
