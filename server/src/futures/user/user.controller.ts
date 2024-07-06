import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { ApiStandardResponses } from 'src/common/decorators/api-response.decorator';
import { UserDto } from './dto/user.dto';
@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'User' })
  @ApiStandardResponses()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  async getOne(@Param('id') id: ObjectId) : Promise<UserDto> {
    const user = await this.userService.getUserById(id); 
    return plainToClass(UserDto, user, { excludeExtraneousValues: true });
  }
}
