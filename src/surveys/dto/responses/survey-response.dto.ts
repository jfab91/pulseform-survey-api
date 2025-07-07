import { ApiProperty } from '@nestjs/swagger';

export class SurveyResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  expiresAt?: Date;

  @ApiProperty({ default: true })
  isActive: boolean;

  @ApiProperty()
  owner: string;
}
