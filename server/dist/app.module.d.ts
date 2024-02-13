import { OnModuleInit } from "@nestjs/common";
export declare class AppModule implements OnModuleInit {
    constructor();
    onModuleInit(): void;
    connectToMongo(): Promise<void>;
}
