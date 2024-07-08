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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Types } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import ObjectId = Types.ObjectId;
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiStandardResponses } from 'src/common/decorators/api-response.decorator';


@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  create(
    @UploadedFiles() files,
    @Body() dto: CreateTrackDto,
    @Body('artistIds') artistIds: string[],
    @Body('albumId') albumId: string,

  ) {
    console.log('Received files:', files);
    console.log('DTO:', dto);
    const { picture, audio } = files;
    return this.trackService.create(
      dto,
      artistIds,
      albumId,
    );
  }

  @ApiOperation({ summary: 'Search Tracks' })
  @ApiStandardResponses()
  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackService.search(query);
  }

  @ApiOperation({ summary: 'Get All Tracks' })
  @ApiStandardResponses()
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @ApiOperation({ summary: 'Get Single Trak' })
  @ApiStandardResponses()
  @Get(':id')
  @ApiParam({ name: 'id', description: 'Trak ID', type: String })
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @ApiOperation({ summary: 'Delete Track' })
  @ApiStandardResponses()
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Track ID', type: String })
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @ApiOperation({ summary: 'Listen Track' })
  @ApiStandardResponses()
  @Post('/listen/:id')
  @ApiParam({ name: 'id', description: 'Track ID', type: String })
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
