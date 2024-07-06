import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserDto } from 'src/futures/user/dto/user.dto';

@Exclude()
export class AuthUserDto extends UserDto {
  @ApiProperty()
  @Expose({ name: 'sessionToken' })
  sessionToken: string;
}
