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
import { User } from '../common/decorators';
import { User as UserEntity } from '../users/schemas/user.schema';

@Controller('surveys')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SurveysController {
  constructor(private readonly service: SurveysService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async create(
    @User() user: UserEntity & { _id: string },
    @Body() dto: CreateSurveyDto,
  ): Promise<Survey> {
    return this.service.create(dto, user);
  }

  @Get()
  async findSurveysByUser(@User() user: UserEntity & { _id: string }) {
    return this.service.findAllByUser(user._id);
  }
}
