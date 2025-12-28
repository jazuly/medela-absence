import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { startOfDay, endOfDay, startOfMonth } from 'date-fns';

@Injectable()
export class AbsenceService {
  constructor(private prisma: PrismaService) {}

  findByUserId(userId: string, startDate?: string, endDate?: string) {
    const targetDate = new Date();

    return this.prisma.absense.findMany({
      where: {
        userId,
        login: {
          gte: startDate
            ? startOfDay(new Date(startDate))
            : startOfMonth(targetDate),
          lte: endDate ? endOfDay(new Date(endDate)) : targetDate,
        },
      },
      orderBy: { login: 'asc' },
    });
  }

  async create(userId: string) {
    const targetDate = new Date();
    const dayStart = startOfDay(targetDate);
    const dayEnd = endOfDay(targetDate);

    const existing = await this.prisma.absense.findFirst({
      where: {
        userId,
        login: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    if (existing) {
      if (existing.login && existing.logout) {
        throw new ConflictException(
          `Absence already exists for user on ${targetDate.toDateString()}`,
        );
      }

      return this.prisma.absense.update({
        where: { id: existing.id },
        data: { logout: targetDate },
      });
    } else {
      return this.prisma.absense.create({
        data: {
          userId,
          login: targetDate,
          logout: null,
        },
      });
    }
  }
}
