import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { sanitizeUser } from '../users/helpers/user.helper';
import { UserResponseDto } from '../users/dto';
import { Errors } from '../common/errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException(Errors.USER.NOT_FOUND);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(Errors.AUTH.INVALID_CREDENTIALS);
    }

    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string; user: UserResponseDto }> {
    const user = await this.validateUser(email, password);

    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: sanitizeUser(user),
    };
  }
}
