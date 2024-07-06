import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UnauthorizedException,
  UploadedFiles,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { ValidationException } from '../../common/exceptions/validation.exception';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ApiStandardResponses } from 'src/common/decorators/api-response.decorator';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'User Registration' })
  @ApiStandardResponses()
  async register(@UploadedFiles() files, @Body() dto: RegisterDto) {
    const errors = await this.authService.validateAuthDto(dto);

    if (errors.length > 0) {
      throw new ValidationException('Validation failed', errors);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.create(
      {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      files,
    );

    return this.authService.login(user);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User Login' })
  @ApiStandardResponses()
  async login(@Body() dto: LoginDto) {
    const errors = await this.authService.validateAuthDto(dto);
    if (errors.length > 0) {
      throw new ValidationException('Validation failed', errors);
    }

    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      throw new ValidationException(
        'User not found',
        ['User not found'],
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'User Check Auth' })
  @ApiStandardResponses()
  getOne(@Param('id') id: ObjectId) {
    return this.userService.getUserById(id);
  }
}
