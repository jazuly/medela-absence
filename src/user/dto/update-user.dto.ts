import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  noHp: string;

  @IsOptional()
  @IsString()
  password?: string;
}
