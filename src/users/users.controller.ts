import { Body, Controller } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.service.create(dto);
  }

  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }
}
