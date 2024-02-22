import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Types} from 'mongoose';
import ObjectId = Types.ObjectId
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/albums')

export class AlbumController {
    constructor(private albumService: AlbumService) {
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio'}
    ]))

    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        const {picture} = files;
        return this.albumService.create(dto, picture[0]);
    }

    @Get()
    getAll(@Query('count') count: number, @Query('offset') offset: number) {
        return this.albumService.getAll(count, offset);
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }
}