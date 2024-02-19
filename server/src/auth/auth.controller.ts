import {AuthService} from "./auth.service";
import {Body, Controller, Post, UploadedFiles} from "@nestjs/common";
import {RegisterDto} from "./dto/register.dto";
import {UserService} from "../user/user.service";

@Controller('/auth')

export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {
    }

    @Post('/register')
    async register(@UploadedFiles() files, @Body() dto: RegisterDto) {
        const user = await this.userService.create(dto,files);
        return this.authService.login(user);

        // return this.authService.register(dto, files);
    }
}