import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SurveysModule } from './surveys/surveys.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SurveysModule,
    QuestionsModule,
    ResponsesModule,
    AnalyticsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
