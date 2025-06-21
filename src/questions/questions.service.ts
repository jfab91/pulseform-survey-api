import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly model: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateQuestionDto, surveyId: string): Promise<Question> {
    const question = new this.model({ ...dto, survey: surveyId });

    return question.save();
  }

  async findBySurvey(surveyId: string): Promise<Question[]> {
    return this.model.find({ survey: surveyId }).exec();
  }
}
