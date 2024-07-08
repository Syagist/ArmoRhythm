import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Model, Types } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from '../../file/file.service';
import { Artist } from '../artist/schemas/artist.schema';
import ObjectId = Types.ObjectId;

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    private fileService: FileService,
  ) { }

  async create(
    dto: CreateTrackDto,
    artistIds: string[],
    albumId: string,
  ): Promise<Track> {
    const castedAlbumId = new Types.ObjectId(albumId);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      artists: ['65e185b34e390c07443d36fa','65e185b34e390c07443d36fa'],
      album: castedAlbumId,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return await this.trackModel
      .find()
      .skip(offset)
      .limit(count)
      .populate('album')
      .populate('artists')
      .exec();
  }

  async getOne(id: ObjectId) {
    return await this.trackModel
      .findById(id)
      .populate('album')
      .populate('artists')
      .exec();
  }

  async delete(id: ObjectId) {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens++;
    await track.save();
  }

  async search(query: string): Promise<Track[]> {
    const track = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return track;
  }
}
