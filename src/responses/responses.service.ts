import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SurveysService } from '../surveys/surveys.service';
import { CreateResponseDto } from './dto';
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
    respondent: { sessionId?: string; userId?: string },
  ): Promise<Response> {
    const survey = await this.surveysService.findById(surveyId);
    const questions = (await this.questionsService.findBySurvey(
      surveyId,
    )) as QuestionDocument[];

    if (!survey.isActive) throw new BadRequestException(Errors.SURVEY.INACTIVE);

    if (isSurveyExpired(survey))
      throw new BadRequestException(Errors.SURVEY.EXPIRED);

    SurveyAnswerValidator.validateAnswers(dto.answers, questions);

    const filter = respondent.userId
      ? { survey: survey._id, user: respondent.userId }
      : { survey: survey._id, respondentSessionId: respondent.sessionId };

    const exists = await this.model.exists(filter);

    if (exists) throw new ConflictException(Errors.RESPONSE.ALREADY_SUBMITTED);

    const response = new this.model({
      survey: survey._id,
      answers: dto.answers,
      respondent: respondent.userId,
      respondentSessionId: respondent.sessionId,
    });

    return response.save();
  }

  async findBySurvey(surveyId: string): Promise<ResponseDocument[]> {
    return this.model
      .find({ survey: surveyId })
      .populate('respondent', 'email')
      .lean()
      .exec();
  }

  async findOneBySurvey(
    surveyId: string,
    responseId: string,
  ): Promise<Response> {
    const response = await this.model
      .findOne({ _id: responseId, survey: surveyId })
      .populate('respondent', 'email')
      .lean()
      .exec();

    if (!response) throw new BadRequestException(Errors.RESPONSE.NOT_FOUND);

    return response;
  }
}
