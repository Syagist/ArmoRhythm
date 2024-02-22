import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {GenreService} from "./genre.service";
import {CreateGenreDto} from "./dto/create-genre.dto";
import {Types} from 'mongoose';
import ObjectId = Types.ObjectId

@Controller('/genres')

export class GenreController {
    constructor(private genreService: GenreService) {
    }

    @Post()
    create(@Body() dto: CreateGenreDto) {
        return this.genreService.create(dto);
    }

    @Get()
    getAll() {
        return this.genreService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.genreService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.genreService.delete(id);
    }
}