/* eslint-disable @typescript-eslint/ban-types */
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/users.interface';

export const Roles = (
  role: UserRole[],
): ((target: object, key?: any, descriptor?: any) => any) =>
  SetMetadata('roles', [...role]);
