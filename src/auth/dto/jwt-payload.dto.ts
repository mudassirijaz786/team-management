import { UserRole } from 'src/users/users.interface';

export interface JwtPayload {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}
