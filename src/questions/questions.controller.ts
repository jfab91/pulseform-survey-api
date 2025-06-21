import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { Question } from './schemas/question.schema';
import { UserRole } from '../users/enums';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('surveys/:surveyId/questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  create(
    @Param('surveyId') surveyId: string,
    @Body() dto: CreateQuestionDto,
  ): Promise<Question> {
    return this.service.create(dto, surveyId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  findAll(@Param('surveyId') surveyId: string) {
    return this.service.findBySurvey(surveyId);
  }

  @Patch(':questionId')
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  update(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.service.update(questionId, dto);
  }

  @Delete(':questionId')
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  remove(@Param('questionId') questionId: string) {
    return this.service.delete(questionId);
  }
}
