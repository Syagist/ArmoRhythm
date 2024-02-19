import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as process from "process";
import {environments} from "./environments/environments";

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(environments.port, () => {
            console.log(`Server is running on port ${environments.port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()