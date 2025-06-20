import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const created = new this.model({ ...dto, password: hashedPassword });

    return created.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }
}
