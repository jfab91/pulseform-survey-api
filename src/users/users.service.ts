import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Errors } from '../common/errors';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.model.findOne({ email: dto.email });

    if (existing) throw new ConflictException(Errors.USER.EXISTS);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const created = new this.model({ ...dto, password: hashedPassword });

    return created.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }
}
