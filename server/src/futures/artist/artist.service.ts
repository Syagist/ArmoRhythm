import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateArtistDto } from './dto/create-artist.dto';
import { FileService, FileType } from '../../file/file.service';
import { Artist } from './schemas/artist.schema';
import { Track } from '../track/schemas/track.schema';
import ObjectId = Types.ObjectId;
import { Album } from '../album/schemas/album.schema';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateArtistDto, picture): Promise<Artist> {
    const picturePath = this.fileService.createFile(
      FileType.IMAGE,
      picture,
      'artists',
    );
    return this.artistModel.create({ ...dto, picture: picturePath });
  }

  async getAll(count = 10, offset = 0): Promise<Artist[]> {
    return this.artistModel.find().skip(offset).limit(count);
  }

  async getOne(id: ObjectId) {
    const artist = await this.artistModel.findById(id).exec();

    if (!artist) {
      return null;
    }

    artist.tracks = await this.trackModel
      .find({ artists: artist.id })
      .populate('artists')
      .exec();

    artist.albums = await this.albumModel
      .find({ artists: artist.id })
      .populate('artists')
      .exec();
    console.log('12312313');
    console.log(artist.albums);
    return artist;
  }

  async delete(id: ObjectId) {
    const track = await this.artistModel.findByIdAndDelete(id);
    return track._id;
  }

  async search(query: string) {
    const artists = await this.artistModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return artists;
  }
}
