import {AuthService} from "./auth.service";
import {Body, Controller, HttpStatus, Post, UnauthorizedException, UploadedFiles} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {RegisterDto} from "./dto/register.dto";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
import {ValidationException} from "../common/exceptions/validation.exception";

@Controller('/auth')

export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {
    }

    @Post('/register')
    async register(@UploadedFiles() files, @Body() dto: RegisterDto) {
        const errors = await this.authService.validateAuthDto(dto);
        if (errors.length > 0) {
            throw new ValidationException('Validation failed', errors);
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10); // You can adjust the saltRounds
        const user = await this.userService.create({
            email: dto.email,
            password: hashedPassword, // Save the hashed password
            firstName: dto.firstName,
            lastName: dto.lastName,
        }, files);
        return this.authService.login(user);
    }

    @Post('/login')
    async login(@Body() dto: LoginDto) {
        const errors = await this.authService.validateAuthDto(dto);
        if (errors.length > 0) {
            throw new ValidationException('Validation failed', errors);
        }

        const user = await this.userService.getUserByEmail(dto.email);

        if (!user) {
            throw new ValidationException('User not found', ['User not found'], HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(dto.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(user);
    }
}