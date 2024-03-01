import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { FileService, FileType } from '../../file/file.service';
import { Album } from './schemas/album.schema';
import ObjectId = Types.ObjectId;

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(
      FileType.IMAGE,
      picture,
      'albums',
    );
    return this.albumModel.create({ ...dto, picture: picturePath });
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    return this.albumModel.find().skip(offset).limit(count);
  }

  async getOne(id: ObjectId) {
    return this.albumModel.findById(id).populate('tracks');
  }

  async delete(id: ObjectId) {
    const track = await this.albumModel.findByIdAndDelete(id);
    return track._id;
  }

  async search(query: string) {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    return albums;
  }
}
