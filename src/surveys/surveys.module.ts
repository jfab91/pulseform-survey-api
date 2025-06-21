import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { SurveysController } from './surveys.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  providers: [SurveysService],
  controllers: [SurveysController],
})
export class SurveysModule {}
