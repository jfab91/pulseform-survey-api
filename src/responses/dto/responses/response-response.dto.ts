import { ApiProperty } from '@nestjs/swagger';

import { AnswerDto } from '../answer.dto';

export class ResponseResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  survey: string;

  @ApiProperty({ required: false })
  respondent?: string;

  @ApiProperty()
  answers: AnswerDto[];

  @ApiProperty({ required: false })
  respondentSessionId?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
