import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Survey } from '../../surveys/schemas/survey.schema';
import { User } from '../../users/schemas/user.schema';

export type ResponseDocument = HydratedDocument<Response>;

export class Answer {
  questionId: mongoose.Schema.Types.ObjectId;
  value: string | number | boolean;
}

@Schema({ timestamps: true })
export class Response {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true })
  survey: Survey;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  respondent?: User;

  @Prop({
    type: [{ questionId: mongoose.Schema.Types.ObjectId, value: {} }],
    required: true,
  })
  answers: Answer[];
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
