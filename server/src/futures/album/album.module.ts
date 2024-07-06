import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { FileService } from '../../file/file.service';
import { Artist, ArtistSchema } from '../artist/schemas/artist.schema';
import { Track, TrackSchema } from '../track/schemas/track.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
})
export default class AlbumModule {}
