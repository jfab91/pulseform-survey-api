import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AnswerDto {
  @ApiProperty()
  @IsMongoId()
  questionId: string;

  @ApiProperty({
    oneOf: [
      { type: 'string', example: 'Lorem ipsum dolor sit amet' },
      { type: 'number', example: 42 },
      { type: 'boolean', example: true },
    ],
  })
  value: string | number | boolean;
}
