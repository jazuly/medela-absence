import { IsDateString } from 'class-validator';

export class AbsenceQueryDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
