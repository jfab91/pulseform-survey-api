import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Errors } from '../common/errors';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private readonly model: Model<QuestionDocument>,
  ) {}

  async create(dto: CreateQuestionDto, surveyId: string): Promise<Question> {
    const question = new this.model({ ...dto, survey: surveyId });

    return question.save();
  }

  async findBySurvey(
    surveyId: string,
    opts?: { lean: boolean },
  ): Promise<Question[] | QuestionDocument[]> {
    const query = this.model.find({ survey: surveyId });

    if (opts?.lean) query.lean();

    return query.exec();
  }

  async update(questionId: string, dto: UpdateQuestionDto): Promise<Question> {
    const updated = await this.model
      .findByIdAndUpdate(questionId, dto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(Errors.QUESTION.NOT_FOUND);

    return updated;
  }

  async delete(questionId: string): Promise<void> {
    const result = await this.model.findByIdAndDelete(questionId);

    if (!result) throw new NotFoundException(Errors.QUESTION.NOT_FOUND);
  }
}
