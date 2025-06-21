import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './schemas/response.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SurveysService } from '../surveys/surveys.service';
import { CreateResponseDto } from './dto';
import { UserDocument } from '../users/schemas/user.schema';
import { Errors } from '../common/errors';
import { isSurveyExpired } from './helpers/survey.helpers';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name)
    private readonly model: Model<ResponseDocument>,
    private readonly surveysService: SurveysService,
  ) {}

  async submit(
    surveyId: string,
    dto: CreateResponseDto,
    user?: UserDocument,
  ): Promise<Response> {
    const survey = await this.surveysService.findById(surveyId);

    if (!survey.isActive) throw new BadRequestException(Errors.SURVEY.INACTIVE);

    if (isSurveyExpired(survey))
      throw new BadRequestException(Errors.SURVEY.EXPIRED);

    const response = new this.model({
      survey: survey._id,
      respondent: user ? user._id : null,
      answers: dto.answers,
    });

    return response.save();
  }
}
