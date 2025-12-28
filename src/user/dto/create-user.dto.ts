import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nama: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  posisi: string;

  @IsString()
  noHp: string;
}
