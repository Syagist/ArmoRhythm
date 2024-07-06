import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artist.schema';
import { FileService } from '../../file/file.service';
import { Track, TrackSchema } from '../track/schemas/track.schema';
import { Album, AlbumSchema } from '../album/schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, FileService],
})
export default class ArtistModule {}
