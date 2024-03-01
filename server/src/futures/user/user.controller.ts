import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.userService.getUserById(id);
  }
}
