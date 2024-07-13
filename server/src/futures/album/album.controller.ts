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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
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

@ApiTags('albums')
@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: 'Create Album' })
  @ApiStandardResponses()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAlbumDto })
  create(@UploadedFiles() files, @Body() createAlbumDto: CreateAlbumDto) {
    const { picture } = files;
    return this.albumService.create(
      createAlbumDto,
      picture[0],
      createAlbumDto.artistIds,
    );
  }

  @ApiOperation({ summary: 'Search Album' })
  @ApiStandardResponses()
  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @ApiOperation({ summary: 'Get All Albums' })
  @ApiStandardResponses()
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @ApiOperation({ summary: 'Get Single Album' })
  @ApiStandardResponses()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Album ID', type: String })
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @ApiOperation({ summary: 'Delete Album' })
  @ApiStandardResponses()
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Album ID', type: String })
  delete(@Param('id') id: ObjectId) {
    return this.albumService.delete(id);
  }
}
