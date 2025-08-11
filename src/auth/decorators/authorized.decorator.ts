import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';
import { Request } from 'express';

type RequestWithUser = Request & { user?: UserEntity };

export const Authorized = createParamDecorator(
  (data: keyof UserEntity | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not authorized');
    }
    return data ? user[data] : user;
  },
);
