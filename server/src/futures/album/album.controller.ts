import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors,} from '@nestjs/common';
import {AlbumService} from './album.service';
import {CreateAlbumDto} from './dto/create-album.dto';
import {Types} from 'mongoose';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags,} from '@nestjs/swagger';
import {ApiStandardResponses} from 'src/common/decorators/api-response.decorator';
import * as fs from 'fs';
import * as unzipper from 'unzipper';
import fetch from 'node-fetch';
import ObjectId = Types.ObjectId;
import mm from 'music-metadata';
import * as path from 'path';

@ApiTags('albums')
@Controller('/albums')
export class AlbumController {
    constructor(private albumService: AlbumService) {
    }

    @ApiOperation({summary: 'Create Album'})
    @ApiStandardResponses()
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{name: 'picture', maxCount: 1}]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateAlbumDto})
    create(@UploadedFiles() files, @Body() createAlbumDto: CreateAlbumDto) {
        const {picture} = files;
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

    @ApiOperation({summary: 'Delete Album'})
    @ApiStandardResponses()
    @Delete(':id')
    @ApiParam({name: 'id', description: 'Album ID', type: String})
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }

    @ApiOperation({summary: 'Load Artist with albums and tracks from Jamendo'})
    @ApiStandardResponses()
    @Post(':name')
    @ApiParam({name: 'name', description: 'Artist name', type: String})
    async loadArtistWithAlbums(@Param('name') name: string) {
        const JAMENDO_API_KEY = '07549b44';
        const URL = `https://api.jamendo.com/v3.0/albums/?client_id=${JAMENDO_API_KEY}&format=jsonpretty&artist_name=we+are+fm`;
        const OUTPUT_DIR = './downloaded_music';

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }

        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: any = await response.json();
            console.log(data)
            for (const album of data.results) {
                const ZIP_URL = album.zip;
                if(!album.zip_allowed){
                   return;
                }

                const zipResponse = await fetch(ZIP_URL);
                if (!zipResponse.ok) {
                    throw new Error(`HTTP error! Status: ${zipResponse.status}`);
                }

                const stream = fs.createWriteStream(`${OUTPUT_DIR}/${album.name}.zip`);
                zipResponse.body.pipe(stream);

                stream.on('finish', async () => {
                   await fs.createReadStream(`${OUTPUT_DIR}/${album.name}.zip`)
                        .pipe(unzipper.Extract({ path: OUTPUT_DIR }))
                        .on('close', async () => {
                            console.log(`Unzipped album ${album.name}`);
                            await this.logMp3Metadata(OUTPUT_DIR);

                        })
                        .on('error', (error) => {
                            console.error('Error unzipping file:', error);
                        });
                });

                stream.on('error', (error) => {
                    console.error('Error writing zip file:', error);
                });
            }
        } catch (error) {
            console.error('Error fetching album information:', error);
        }

        return {};
    }
    async logMp3Metadata(directory: string) {
        fs.readdir(directory, async (err, files) => {
            if (err) {
                return console.error('Unable to scan directory:', err);
            }

            for (const file of files) {
                const filePath = path.join(directory, file);
                if (path.extname(file) === '.mp3') {
                    try {
                        const metadata = await mm.parseFile(filePath);
                        console.log(`Metadata for ${file}:`, metadata);
                    } catch (error) {
                        console.error(`Error reading metadata for ${file}:`, error);
                    }
                }
            }
        });
    }
}
