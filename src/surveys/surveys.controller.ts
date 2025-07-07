import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SurveysService } from './surveys.service';
import { Survey } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums';
import { User } from '../common/decorators';
import { User as UserEntity } from '../users/schemas/user.schema';
import { SurveyResponseDto } from './dto/responses';

@ApiTags('Surveys')
@Controller('surveys')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SurveysController {
  constructor(private readonly service: SurveysService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new survey' })
  @ApiResponse({
    status: 201,
    description: 'Survey created successfully',
    type: SurveyResponseDto,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async create(
    @User() user: UserEntity & { _id: string },
    @Body() dto: CreateSurveyDto,
  ): Promise<Survey> {
    return this.service.create(dto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all surveys for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of surveys for the user',
    type: [SurveyResponseDto],
  })
  async findSurveysByUser(@User() user: UserEntity & { _id: string }) {
    return this.service.findAllByUser(user._id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single survey by ID' })
  @ApiResponse({ status: 200, type: SurveyResponseDto })
  async findOne(
    @Param('id') id: string,
    @User() user: UserEntity & { _id: string },
  ): Promise<Survey> {
    return this.service.findOneByUser(id, user._id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a survey by ID' })
  @ApiResponse({ status: 204, description: 'Survey deleted successfully' })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
