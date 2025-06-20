import { UserResponseDto } from '../dto';
import { UserDocument } from '../schemas/user.schema';

export function sanitizeUser(user: UserDocument): UserResponseDto {
  return new UserResponseDto({
    id: user._id as string,
    email: user.email,
    role: user.role,
  });
}
