import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nama: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsString()
  posisi: string;

  @IsString()
  noHp: string;
}
