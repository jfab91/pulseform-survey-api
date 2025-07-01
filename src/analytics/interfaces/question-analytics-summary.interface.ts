import { QuestionType } from '../../questions/enums';

export interface QuestionAnalyticsSummary {
  questionId: string;
  text: string;
  type: QuestionType;
  summary: Record<string, number> | { average: number } | { count: number };
}
