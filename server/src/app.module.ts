import {Module} from "@nestjs/common";
import TrackModule from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import * as path from 'path';
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'static'),
        }),
        TrackModule,
        FileModule
    ],
})

export class AppModule {
    constructor() {
    }
}