import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {CreateArtistDto} from "./dto/create-artist.dto";
import {FileService, FileType} from "../../file/file.service";
import ObjectId = Types.ObjectId;
import {Artist} from "./schemas/artist.schema";

@Injectable()

export class ArtistService {
    constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>,
                private fileService: FileService) {
    }

    async create(dto: CreateArtistDto, picture): Promise<Artist> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture,'artists')
        return this.artistModel.create(
            {...dto, picture: picturePath})
    }

    async getAll(count = 10, offset = 0): Promise<Artist[]> {
        return this.artistModel.find().skip(offset).limit(count);
    }

    async getOne(id: ObjectId) {
        return this.artistModel.findById(id)
            .populate('tracks');
    }

    async delete(id: ObjectId) {
        const track = await this.artistModel.findByIdAndDelete(id);
        return track._id;
    }
}