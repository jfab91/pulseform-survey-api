import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
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
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseResponseDto } from './dto/responses';

@ApiTags('Responses')
@ApiHeader({
  name: 'X-Session-Id',
  description: 'Session ID for tracking user responses',
  required: false,
})
@UseGuards(JwtAuthGuard)
@Controller('responses')
export class ResponsesController {
  constructor(private readonly service: ResponsesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all responses for a survey' })
  @ApiResponse({
    status: 200,
    description: 'List of responses',
    type: [ResponseResponseDto],
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getAll(@Param('surveyId') surveyId: string): Promise<Response[]> {
    return this.service.findBySurvey(surveyId);
  }

  @Get(':responseId')
  @ApiOperation({ summary: 'Get a specific response by ID' })
  @ApiResponse({
    status: 200,
    description: 'Response details',
    type: ResponseResponseDto,
  })
  @Roles(UserRole.ADMIN, UserRole.CREATOR)
  async getOne(
    @Param('surveyId') surveyId: string,
    @Param('responseId') responseId: string,
  ): Promise<Response> {
    return this.service.findOneBySurvey(surveyId, responseId);
  }

  @Post(':surveyId')
  @ApiOperation({ summary: 'Submit a response to a survey' })
  @ApiResponse({
    status: 201,
    description: 'Response submitted successfully',
    type: ResponseResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Response already submitted' })
  async submitResponse(
    @Param('surveyId') surveyId: string,
    @Body() dto: CreateResponseDto,
    @User() user?: UserEntity & { _id: string },
    @SessionId() sessionId?: string,
  ): Promise<Response> {
    if (!user && !sessionId)
      throw new BadRequestException(Errors.AUTH.SESSION_ID_REQUIRED);

    return this.service.submit(surveyId, dto, { userId: user?._id, sessionId });
  }
}
