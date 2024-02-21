import {HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {User} from "../user/shemas/user.schema";
import {JwtService, JwtSignOptions} from "@nestjs/jwt";
import {environments} from "../environments/environments";
import {Token} from "./jwt-auth-guard";
import {TokenResponse} from "../interfaces/auth/auth";
import {RegisterDto} from "./dto/register.dto";
import {validate} from "class-validator";
import {LoginDto} from "./dto/login.dto";
import {ValidationException} from "../common/exceptions/validation.exception";
import {UserViewModel} from "../user/user.view-model";


@Injectable()

export class AuthService {
    constructor(private jwtService: JwtService) {
    }

    async login(user: User): Promise<TokenResponse> {

        const payload: Token = {
            sub: user.id,
            username: user.firstName + ' ' + user.lastName,
        };

        let refresh_token: string;

        if (environments.accessTokenExpiration) {
            refresh_token = await this.jwtService.signAsync(
                payload,
                this.getRefreshTokenOptions(user),
            );
        }
        const userViewModel = new UserViewModel(user);

        return {
            access_token: {
                token: await this.jwtService.signAsync(
                    payload,
                    this.getAccessTokenOptions(user),
                ),
                expires: environments.accessTokenExpiration,
            },
            refresh_token: {
                token: refresh_token,
                expires: environments.refreshTokenExpiration,
            },
            user: user
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

    async validateAuthDto(dto: RegisterDto | LoginDto): Promise<string[]> {
        const errors = await validate(dto);

        if (errors.length > 0) {
            const validationErrors = errors.map(error => String(Object.values(error.constraints)));
            return validationErrors.reduce((acc, val) => acc.concat(val), []);

        }

        return [];
    }
}