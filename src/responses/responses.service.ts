import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SurveysService } from '../surveys/surveys.service';
import { CreateResponseDto } from './dto';
import { UserDocument } from '../users/schemas/user.schema';
import { Errors } from '../common/errors';
import { isSurveyExpired } from './helpers/survey.helpers';
import { QuestionsService } from '../questions/questions.service';
import { SurveyAnswerValidator } from './validators/survey-answer.validator';
import { QuestionDocument } from '../questions/schemas/question.schema';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly model: Model<ResponseDocument>,
    private readonly surveysService: SurveysService,
    private readonly questionsService: QuestionsService,
  ) {}

  async submit(
    surveyId: string,
    dto: CreateResponseDto,
    user?: UserDocument,
  ): Promise<Response> {
    const survey = await this.surveysService.findById(surveyId);
    const questions = (await this.questionsService.findBySurvey(
      surveyId,
    )) as QuestionDocument[];

    if (!survey.isActive) throw new BadRequestException(Errors.SURVEY.INACTIVE);

    if (isSurveyExpired(survey))
      throw new BadRequestException(Errors.SURVEY.EXPIRED);

    SurveyAnswerValidator.validateAnswers(dto.answers, questions);

    const response = new this.model({
      survey: survey._id,
      respondent: user ? user._id : null,
      answers: dto.answers,
    });

    return response.save();
  }
}
