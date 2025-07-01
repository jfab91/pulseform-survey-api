import { BadRequestException } from '@nestjs/common';

import { QuestionType } from '../../questions/enums';
import {
  Question,
  QuestionDocument,
} from '../../questions/schemas/question.schema';
import { AnswerDto } from '../dto/answer.dto';
import { Errors } from '../../common/errors';

type ValidatorFn = (value: any, question: Question) => void;

export class SurveyAnswerValidator {
  private static readonly validators: Record<QuestionType, ValidatorFn> = {
    [QuestionType.SHORT_TEXT]: (value) => {
      if (typeof value !== 'string')
        throw new BadRequestException('Answer must be a string');
    },
    [QuestionType.MULTIPLE_CHOICE]: (value, question) => {
      if (typeof value !== 'string' || !question.options?.includes(value))
        throw new BadRequestException(
          `Answer must be one of: ${question.options?.join(', ')}`,
        );
    },
    [QuestionType.BOOLEAN]: (value) => {
      if (typeof value !== 'boolean')
        throw new BadRequestException('Answer must be true or false');
    },
    [QuestionType.RATING]: (value) => {
      if (typeof value !== 'number' || value < 1 || value > 5)
        throw new BadRequestException('Answer must be between 1 and 5');
    },
  };

  public static validateAnswers(
    answers: AnswerDto[],
    questions: QuestionDocument[],
  ): void {
    this.validateTypes(answers, questions);
    this.validateRequired(answers, questions);
  }

  private static validateTypes(
    answers: AnswerDto[],
    questions: QuestionDocument[],
  ): void {
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);

      if (!question) {
        throw new BadRequestException(Errors.QUESTION.NOT_FOUND);
      }

      const validator = this.validators[question.type];

      if (!validator) {
        throw new BadRequestException(Errors.QUESTION.UNSUPPORTED_TYPE);
      }

      validator(answer.value, question);
    }
  }

  private static validateRequired(
    answers: AnswerDto[],
    questions: QuestionDocument[],
  ): void {
    for (const question of questions) {
      const wasAnswered = answers.some(
        (answer) => answer.questionId === question._id.toString(),
      );

      if (question.required && !wasAnswered)
        throw new BadRequestException(`Question ${question.text} is required`);
    }
  }
}
