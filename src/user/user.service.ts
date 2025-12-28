import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { startOfDay, endOfDay } from 'date-fns';
import { hashSync } from 'bcrypt';
import { Uploader } from './uploader';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private uploader: Uploader,
  ) {}

  async findOne(id: string) {
    const targetDate = new Date();
    const dayStart = startOfDay(targetDate);
    const dayEnd = endOfDay(targetDate);

    return this.prisma.user.findUnique({
      where: { id },
      include: {
        absenses: {
          where: {
            login: {
              gte: dayStart,
              lte: dayEnd,
            },
          },
        },
      },
    });
  }

  async find() {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserDto, foto: Express.Multer.File) {
    const saltOrRounds = 10;
    const hashedPassword = hashSync(data.password, saltOrRounds);
    const fileName = foto ? await this.uploader.s3(foto) : null;

    return this.prisma.user.create({
      data: {
        nama: data.nama,
        email: data.email,
        foto: fileName,
        posisi: data.posisi,
        noHp: data.noHp,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: UpdateUserDto, foto: Express.Multer.File) {
    const user = await this.findOne(id);

    if (!user) {
      throw new BadRequestException(`User not found`);
    }

    const fileName = foto ? await this.uploader.s3(foto) : user.foto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        foto: fileName,
      },
    });
  }
}
