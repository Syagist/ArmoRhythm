import {Module} from "@nestjs/common";
import TrackModule from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';
import * as path from 'path';
import {FileModule} from "./file/file.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import AuthModule from "./auth/auth.module";
import UserModule from "./user/user.module";
import {environments} from "./environments/environments";
dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(environments.mongoUri),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'static'),
        }),
        TrackModule,
        AuthModule,
        UserModule,
        FileModule
    ],
})

export class AppModule {
    constructor() {
    }
}