import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { absenses: true },
    });
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        nama: data.nama,
        email: data.email,
        foto: data.foto,
        posisi: data.posisi,
        noHp: data.noHp,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
