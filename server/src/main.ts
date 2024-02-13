import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as process from "process";
import * as dotenv from 'dotenv';

dotenv.config();
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;

        const app = await NestFactory.create(AppModule)

        await app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()