import { QuestionAnalyticsSummary } from './question-analytics-summary.interface';

export interface SurveyAnalyticsResult {
  totalResponses: number;
  questions: QuestionAnalyticsSummary[];
}
