import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('roles', roles);
    console.log('user', user);

    return matchRoles(roles, user?.roles);
  }
}

const matchRoles = (roles: string[], userRoles: string[]) => {
  const res = userRoles.some((role) => roles.includes(role));
  if (!res) {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
  return res;
};
