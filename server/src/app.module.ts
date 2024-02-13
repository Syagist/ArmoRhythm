import {Module, OnModuleInit} from "@nestjs/common";
import TrackModule from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL),
        TrackModule
    ],
})

export class AppModule {
    constructor() {
    }
}