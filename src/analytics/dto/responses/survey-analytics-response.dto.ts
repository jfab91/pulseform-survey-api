import { ApiProperty } from '@nestjs/swagger';

import { QuestionType } from '../../../questions/enums';

class QuestionAnalyticsSummaryResponseDto {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ enum: QuestionType, enumName: 'QuestionType' })
  type: QuestionType;

  @ApiProperty({
    oneOf: [
      { type: 'object', properties: { average: { type: 'number' } } },
      { type: 'object', properties: { cpint: { type: 'number' } } },
      {
        type: 'object',
        additionalProperties: { type: 'number' },
        example: { yes: 10, no: 5 },
      },
    ],
    nullable: true,
  })
  summary:
    | Record<string, number>
    | { average: number }
    | { count: number }
    | null;
}

export class SurveyAnalyticsResponseDto {
  @ApiProperty()
  totalResponses: number;

  @ApiProperty()
  questions: QuestionAnalyticsSummaryResponseDto[];
}
