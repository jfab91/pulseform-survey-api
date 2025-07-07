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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionResponseDto } from './dto/responses';

@ApiTags('Surveys')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('surveys/:surveyId/questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new question for a survey' })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: QuestionResponseDto,
  })
  @Post()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  create(
    @Param('surveyId') surveyId: string,
    @Body() dto: CreateQuestionDto,
  ): Promise<Question> {
    return this.service.create(dto, surveyId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all questions for a survey' })
  @ApiResponse({
    status: 200,
    description: 'List of questions',
    type: [QuestionResponseDto],
  })
  @Get()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  findAll(@Param('surveyId') surveyId: string) {
    return this.service.findBySurvey(surveyId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a question' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: QuestionResponseDto,
  })
  @Patch(':questionId')
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  update(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.service.update(questionId, dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({ status: 204, description: 'Question deleted successfully' })
  @Delete(':questionId')
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  remove(@Param('questionId') questionId: string): Promise<void> {
    return this.service.delete(questionId);
  }
}
