import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../user/shemas/user.schema";
import {Model} from "mongoose";
import {FileService, FileType} from "../file/file.service";
import {RegisterDto} from "./dto/register.dto";
import {UserService} from "../user/user.service";
import {TokenResponse} from "../interfaces/auth/auth";
import {JwtService, JwtSignOptions} from "@nestjs/jwt";
import {environments} from "../environments/environments";
import {Token} from "./jwt-auth-guard";


@Injectable()

export class AuthService {
    constructor(private jwtService: JwtService) {
    }
    async login(user: User): Promise<TokenResponse> {
        const payload: Token = {
            sub: user.id,
            username: user.firstName,
        };

        let refresh_token: string;

        if (environments.accessTokenExpiration) {
            refresh_token = await this.jwtService.signAsync(
                payload,
                this.getRefreshTokenOptions(user),
            );
        }

        return {
            access_token: await this.jwtService.signAsync(
                payload,
                this.getAccessTokenOptions(user),
            ),
            refresh_token,
        };
    }

    getRefreshTokenOptions(user: User): JwtSignOptions {
        return this.getTokenOptions('refresh', user);
    }

    getAccessTokenOptions(user: User): JwtSignOptions {
        return this.getTokenOptions('access', user);
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