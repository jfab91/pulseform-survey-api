import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseSchema, Response } from './schemas/response.schema';
import { SurveysModule } from '../surveys/surveys.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Response.name, schema: ResponseSchema },
    ]),
    SurveysModule,
  ],
  providers: [ResponsesService],
  controllers: [ResponsesController],
})
export class ResponsesModule {}
