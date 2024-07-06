import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USER_CREDENTIALS_MAX_LENGTH,
  USER_CREDENTIALS_MIN_LENGTH,
} from '../../../shared/constants';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH)
  @ApiProperty({ example: 'user@example.com', description: 'Email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @ApiProperty({ example: 'password123', description: 'Password' })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(USER_CREDENTIALS_MIN_LENGTH, USER_CREDENTIALS_MAX_LENGTH)
  @ApiProperty({ example: 'John', description: 'Name' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(USER_CREDENTIALS_MIN_LENGTH, USER_CREDENTIALS_MAX_LENGTH)
  @ApiProperty({ example: 'Doe', description: 'Last Name' })
  readonly lastName: string;
}
