import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {User} from "./shemas/user.schema";
import {FileService, FileType} from "../../file/file.service";

@Injectable()

export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
                private fileService: FileService) {
    }

    async create(body: Partial<User>, picture) {
        const user = await this.userModel.create(body);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture, 'users')
        user.generateSessionToken();
        user.picture = picturePath;
        return user.save();
    }

    getUserByEmail(mail: string) {
        const email = {$regex: new RegExp(`^${mail}$`, 'i')};

        return this.userModel.findOne({email});
    }

    getUserById(id: ObjectId | string) {
        return this.userModel.findById(id);
    }

    async validateUserById(id: string) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}