import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../../enums';

export class QuestionResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ enum: QuestionType, enumName: 'QuestionType' })
  type: QuestionType;

  @ApiProperty()
  required: boolean;

  @ApiProperty({ required: false })
  options?: string[];
}
