import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Survey, SurveyDocument } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto';
import { UserDocument } from '../users/schemas/user.schema';
import { Errors } from '../common/errors';

@Injectable()
export class SurveysService {
  constructor(@InjectModel(Survey.name) private model: Model<SurveyDocument>) {}

  async create(dto: CreateSurveyDto, user: UserDocument): Promise<Survey> {
    const created = new this.model({ ...dto, owner: user._id });

    return created.save();
  }

  async findAllByUser(userId: string): Promise<Survey[]> {
    return this.model.find({ owner: userId }).exec();
  }

  async findById(id: string): Promise<SurveyDocument> {
    const survey = await this.model.findById(id).exec();

    if (!survey) throw new NotFoundException(Errors.SURVEY.NOT_FOUND);

    return survey;
  }
}
