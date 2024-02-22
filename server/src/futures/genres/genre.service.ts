import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {CreateGenreDto} from "./dto/create-genre.dto";
import ObjectId = Types.ObjectId;
import {Genre} from "./schemas/genre.schema";

@Injectable()

export class GenreService {
    constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {
    }

    async create(dto: CreateGenreDto): Promise<Genre> {
        return this.genreModel.create(dto);
    }

    async getAll(): Promise<Genre[]> {
        return this.genreModel.find();
    }

    async getOne(id: ObjectId) {
        return this.genreModel.findById(id);
    }

    async delete(id: ObjectId) {
        const genre = await this.genreModel.findByIdAndDelete(id);
        return genre._id;
    }
}