import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  noHp: string;

  @IsString()
  password: string;
}
