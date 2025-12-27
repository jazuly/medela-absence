import {
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { AbsenceQueryDto } from './dto/absence-query.dto';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Get(':userId')
  findByUserId(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Query() query: AbsenceQueryDto,
  ) {
    return this.absenceService.findByUserId(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Patch(':userId')
  create(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.absenceService.create(userId);
  }
}
