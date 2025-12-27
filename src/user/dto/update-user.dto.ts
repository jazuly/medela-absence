import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  foto?: string;

  @IsString()
  noHp: string;
}
