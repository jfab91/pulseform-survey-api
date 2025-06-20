import { UserRole } from '../enums';

export class UserResponseDto {
  id: string;
  email: string;
  role: UserRole;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
