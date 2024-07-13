import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Types } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import ObjectId = Types.ObjectId;
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/common/decorators/api-response.decorator';

@ApiTags('artists')
@Controller('/artists')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Create Artist' })
  @ApiStandardResponses()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateArtistDto })
  create(@UploadedFiles() files, @Body() dto: CreateArtistDto) {
    const { picture } = files;
    return this.artistService.create(dto, picture[0]);
  }

  @ApiOperation({ summary: 'Search Artist' })
  @ApiStandardResponses()
  @Get('/search')
  search(@Query('query') query: string) {
    return this.artistService.search(query);
  }

  @ApiOperation({ summary: 'Get All Artists' })
  @ApiStandardResponses()
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.artistService.getAll(count, offset);
  }

  @ApiOperation({ summary: 'Get Single Artst' })
  @ApiStandardResponses()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Artst ID', type: String })
  getOne(@Param('id') id: ObjectId) {
    return this.artistService.getOne(id);
  }

  @ApiOperation({ summary: 'Delete Artist' })
  @ApiStandardResponses()
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Artst ID', type: String })
  delete(@Param('id') id: ObjectId) {
    return this.artistService.delete(id);
  }
}
