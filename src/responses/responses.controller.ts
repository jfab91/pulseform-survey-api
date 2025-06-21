import { Body, Controller, Param, Request } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto';
import { Response } from './schemas/response.schema';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly service: ResponsesService) {}

  async submitResponse(
    @Param('surveyId') surveyId: string,
    @Body() dto: CreateResponseDto,
    @Request() req,
  ): Promise<Response> {
    return this.service.submit(surveyId, dto, req.user);
  }
}
