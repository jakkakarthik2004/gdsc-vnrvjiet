import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './CreateUserDto';
import { Users } from './users.model';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async addUser(@Body() payload: CreateUserDto): Promise<Users | undefined> {
    return this.usersService.addUser(payload);
  }

  @Get('/get-user/:id')
  async getUserById(@Param('id') userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Get('/get-user-by-mail')
  async getUserByMail(@Query() query: { email: string; password: string }) {
    return this.usersService.getUserByMail(query);
  }

  @Get('/is-admin/:id')
  async isUserAdmin(@Param('id') userId: number) {
    return this.usersService.isUserAdmin(userId);
  }

  @Delete('/delete-by-id/:id')
  async deleteUser(@Param('id') userId: number) {
    return this.usersService.deleteUser(userId);
  }

  // @Post('/make-admin/:id')
  // async makeUserAdmin(@Param('id') userId: number) {
  //   return this.usersService.makeUserAdmin(userId);
  // }
}
