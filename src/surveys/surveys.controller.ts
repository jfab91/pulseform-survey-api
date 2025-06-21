import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SurveysService } from './surveys.service';
import { Survey } from './schemas/survey.schema';
import { CreateSurveyDto } from './dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums';

@Controller('surveys')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SurveysController {
  constructor(private readonly service: SurveysService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async create(@Body() dto: CreateSurveyDto, @Request() req): Promise<Survey> {
    return this.service.create(dto, req.user);
  }

  @Get()
  async findSurveysByUser(@Request() req) {
    return this.service.findAllByUser(req.user.id);
  }
}
