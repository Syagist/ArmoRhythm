import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { Model, Types } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
// import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from '../../file/file.service';
import ObjectId = Types.ObjectId;

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateTrackDto,
    picture,
    audio,
    artistIds: string[],
    albumId: string,
  ): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
      artists: artistIds,
      album: albumId,
    });
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

  // async addComment(dto: CreateCommentDto): Promise<Comment> {
  //   const track = await this.trackModel.findById(dto.trackId);
  //   const comment = await this.commentModel.create({ ...dto });
  //   track.comments.push(comment._id);
  //   await track.save();
  //   return comment;
  // }

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
