import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from '../../file/file.service';
import { User, UserSchema } from '../user/shemas/user.schema';
import { UserService } from '../user/user.service';
import UserModule from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth-guard';
import { environments } from '../../environments/environments';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    JwtModule.register({
      secret: String(environments.refreshTokenSecret),
      signOptions: { expiresIn: String(environments.refreshTokenExpiration) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtAuthGuard, FileService],
  exports: [JwtAuthGuard, AuthService, JwtModule, UserModule],
})
export default class AuthModule {}
