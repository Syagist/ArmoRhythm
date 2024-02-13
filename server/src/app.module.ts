import {Module, OnModuleInit} from "@nestjs/common";
import TrackModule from "./track/track.module";
import mongoose from "mongoose";

@Module({
    imports: [
        TrackModule
    ],
})

export class AppModule implements OnModuleInit {
    constructor() {
    }

    onModuleInit() {
        this.connectToMongo();
    }

    async connectToMongo() {
        try {
            await mongoose.connect(process.env.MONGO_URL, {});
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
}