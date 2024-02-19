import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./shemas/user.schema";
import {FileService} from "../file/file.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    ],
    controllers:[UserController],
    providers:[UserService, FileService]
})
export default class UserModule {

}