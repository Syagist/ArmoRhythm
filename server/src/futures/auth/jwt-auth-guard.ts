import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Client } from '../../interfaces/client/client';
import { getClient } from '../../shared/utils/get-client';
import { AUTH_NOT_REQUIRED } from './decorators/auth-not-required.decorator';

export interface Token {
  id: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  reflector: Reflector;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {
    this.reflector = new Reflector();
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const client = this.getRequest(ctx);

    const allowAny = this.reflector.get<boolean>(
      AUTH_NOT_REQUIRED,
      ctx.getHandler(),
    );

    try {
      client.user = await this.handleRequest(ctx, client);
    } catch (e) {
      if (allowAny) {
        return true;
      }

      throw e;
    }

    return client.user != null;
  }

  throwException(ctx: ExecutionContext, message: string) {
    if (ctx.getType() === 'ws') {
      ctx.switchToWs().getClient<Socket>().disconnect(true);
    }

    throw new UnauthorizedException(message);
  }

  private async handleRequest(ctx: ExecutionContext, client: Client) {
    const token = this.getToken(ctx, client);

    const decoded = this.jwtService.decode(token) as Token;

    if (!decoded) {
      this.throwException(ctx, 'Unable to decode token');
    }

    try {
      const user = await this.validate(decoded);

      await this.jwtService.verifyAsync<Token>(
        token,
        this.authService.getAccessTokenOptions(user),
      );

      return user;
    } catch (e) {
      this.throwException(ctx, 'Invalid token');
    }
  }

  private validate({ id }: Token) {
    return this.userService.validateUserById(id);
  }

  private getToken(ctx: ExecutionContext, client: Client): string {
    const authorization = client.headers.authorization?.split(' ');

    if (!authorization) {
      this.throwException(ctx, 'Token not found');
    }

    if (authorization[0].toLowerCase() !== 'bearer') {
      this.throwException(ctx, 'Authorization type not valid');
    }

    if (!authorization[1]) {
      this.throwException(ctx, 'Token not provided');
    }

    return authorization[1];
  }

  private getRequest(ctx: ExecutionContext) {
    return getClient(ctx);
  }
}
