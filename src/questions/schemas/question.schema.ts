import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { QuestionType } from '../enums';
import { Survey } from '../../surveys/schemas/survey.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ default: false })
  required: boolean;

  @Prop({ type: [String], default: [] })
  options?: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true })
  survey: Survey;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
