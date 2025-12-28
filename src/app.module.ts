import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AbsenceModule } from './absence/absence.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { Uploader } from './user/uploader';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AbsenceModule,
    PrismaModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService, Uploader],
})
export class AppModule {}
