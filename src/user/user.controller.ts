import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('foto'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    return this.usersService.create(createUserDto, foto);
  }

  @Get()
  find() {
    return this.usersService.find();
  }

  @Get('profile')
  profile(@Request() req) {
    return this.usersService.findOne(req.user.id as string);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('foto'))
  update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    return this.usersService.update(id, data, foto);
  }
}
