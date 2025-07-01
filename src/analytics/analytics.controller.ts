import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums';
import { SurveyAnalyticsResult } from './interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getSurveyAnalytics(
    @Param('surveyId') surveyId: string,
  ): Promise<SurveyAnalyticsResult> {
    return this.service.getSurveyAnalytics(surveyId);
  }
}
