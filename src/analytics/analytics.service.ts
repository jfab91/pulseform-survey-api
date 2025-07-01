import { Injectable } from '@nestjs/common';
import { ResponsesService } from '../responses/responses.service';
import { QuestionsService } from '../questions/questions.service';
import {
  Question,
  QuestionDocument,
} from '../questions/schemas/question.schema';
import { QuestionType } from '../questions/enums';
import { Answer, ResponseDocument } from '../responses/schemas/response.schema';
import { QuestionAnalyticsSummary, SurveyAnalyticsResult } from './interfaces';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly responsesService: ResponsesService,
    private readonly questionsService: QuestionsService,
  ) {}

  public async getSurveyAnalytics(
    surveyId: string,
  ): Promise<SurveyAnalyticsResult> {
    const questions = await this.questionsService.findBySurvey(surveyId);
    const responses = await this.responsesService.findBySurvey(surveyId);

    return {
      totalResponses: responses.length,
      questions: questions.map((question: QuestionDocument) =>
        this.buildQuestionSummary(question, responses),
      ),
    };
  }

  private buildQuestionSummary(
    question: QuestionDocument,
    responses: ResponseDocument[],
  ): QuestionAnalyticsSummary {
    const values = this.extractAnswersForQuestion(
      question._id.toString(),
      responses,
    );
    const summary = this.summarizeByType(question, values);

    return {
      questionId: question._id.toString(),
      text: question.text,
      type: question.type,
      summary,
    };
  }

  private extractAnswersForQuestion(
    questionId: string,
    responses: ResponseDocument[],
  ): Array<Answer['value']> {
    return responses
      .map((r) => r.answers.find((a) => a.questionId.toString() === questionId))
      .filter((a): a is Answer => Boolean(a))
      .map((a) => a.value);
  }

  private summarizeByType(
    question: Question,
    values: Array<string | number | boolean>,
  ): Record<string, number> | { average: number } | { count: number } {
    const summarizers = {
      [QuestionType.BOOLEAN]: (v: typeof values) => this.countOccurrences(v),
      [QuestionType.MULTIPLE_CHOICE]: (v: typeof values) =>
        this.countOccurrences(v),
      [QuestionType.RATING]: (v: typeof values) =>
        this.computeAverage(v as number[]),
      [QuestionType.SHORT_TEXT]: (v: typeof values) => ({
        count: v.length,
      }),
    };

    return summarizers[question.type]?.(values) ?? null;
  }

  private countOccurrences(
    values: Array<string | number | boolean>,
  ): Record<string, number> {
    return values.reduce(
      (acc, value) => {
        const key = String(value);
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  private computeAverage(values: number[]): { average: number } {
    const sum = values.reduce((total, val) => total + val, 0);
    const avg = values.length ? sum / values.length : 0;
    return { average: Number(avg.toFixed(2)) };
  }
}
