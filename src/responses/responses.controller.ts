import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto';
import { Response } from './schemas/response.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums';
import { SessionId, User } from '../common/decorators';
import { User as UserEntity } from '../users/schemas/user.schema';
import { Errors } from '../common/errors';

@UseGuards(JwtAuthGuard)
@Controller('responses')
export class ResponsesController {
  constructor(private readonly service: ResponsesService) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getAll(@Param('surveyId') surveyId: string): Promise<Response[]> {
    return this.service.findBySurvey(surveyId);
  }

  @Get(':responseId')
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getOne(
    @Param('surveyId') surveyId: string,
    @Param('responseId') responseId: string,
  ): Promise<Response> {
    return this.service.findOneBySurvey(surveyId, responseId);
  }

  async submitResponse(
    @Param('surveyId') surveyId: string,
    @Body() dto: CreateResponseDto,
    @User() user?: UserEntity & { _id: string },
    @SessionId() sessionId?: string,
  ): Promise<Response> {
    if (!sessionId)
      throw new BadRequestException(Errors.AUTH.SESSION_ID_REQUIRED);

    return this.service.submit(surveyId, dto, { userId: user?._id, sessionId });
  }
}
