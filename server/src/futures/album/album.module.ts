import {Module} from "@nestjs/common";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {MongooseModule} from "@nestjs/mongoose";
import {AlbumSchema, Album} from "./schemas/album.schema";
import {FileService} from "../../file/file.service"; // Import Comment model

@Module({
    imports: [
        MongooseModule.forFeature([{name:Album.name,schema:AlbumSchema}]),
    ],
    controllers:[AlbumController],
    providers:[AlbumService, FileService]
})
export default class AlbumModule {

}