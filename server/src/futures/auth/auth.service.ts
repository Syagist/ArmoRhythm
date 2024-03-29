import { Injectable } from '@nestjs/common';
import { User } from '../user/shemas/user.schema';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { environments } from '../../environments/environments';
import { Token } from './jwt-auth-guard';
import { TokenResponse } from '../../interfaces/auth/auth';
import { RegisterDto } from './dto/register.dto';
import { validate } from 'class-validator';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<TokenResponse> {
    const accessTokenPayload: Token = {
      id: user.id,
    };

    const refreshTokenPayload: Token = {
      id: user.id,
    };

    let refresh_token: string;

    if (environments.accessTokenExpiration) {
      refresh_token = await this.jwtService.signAsync(
        refreshTokenPayload,
        this.getRefreshTokenOptions(user),
      );
    }

    return {
      access_token: {
        token: await this.jwtService.signAsync(
          accessTokenPayload,
          this.getAccessTokenOptions(user),
        ),
        expires: environments.accessTokenExpiration,
      },
      refresh_token: {
        token: refresh_token,
        expires: environments.refreshTokenExpiration,
      },
      user: user,
    };
  }

  getRefreshTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('refresh', user);
  }

  getAccessTokenOptions(user: User): JwtSignOptions {
    return this.getTokenOptions('access', user);
  }

  async validateAuthDto(dto: RegisterDto | LoginDto): Promise<string[]> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error) =>
        String(Object.values(error.constraints)),
      );
      return validationErrors.reduce((acc, val) => acc.concat(val), []);
    }

    return [];
  }

  private getTokenOptions(type: 'refresh' | 'access', user: User) {
    const options: JwtSignOptions = {
      secret: environments[type + 'TokenSecret'] + user.sessionToken,
    };

    const expiration = environments[type + 'TokenExpiration'];

    if (expiration) {
      options.expiresIn = expiration;
    }

    return options;
  }
}
