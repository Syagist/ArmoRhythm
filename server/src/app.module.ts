import {Module} from "@nestjs/common";
import TrackModule from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import {FileModule} from "./file/file.module";
dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        TrackModule,
        FileModule
    ],
})

export class AppModule {
    constructor() {
    }
}