import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ResponsesModule } from '../responses/responses.module';
import { QuestionsModule } from '../questions/questions.module';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [ResponsesModule, QuestionsModule],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
