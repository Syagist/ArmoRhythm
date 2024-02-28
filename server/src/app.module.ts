import * as dotenv from 'dotenv';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { environments } from './environments/environments';
import { FileModule } from './file/file.module';
import TrackModule from './futures/track/track.module';
import AuthModule from './futures/auth/auth.module';
import UserModule from './futures/user/user.module';
import ArtistModule from './futures/artist/artist.module';
import AlbumModule from './futures/album/album.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(environments.mongoUri),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    TrackModule,
    ArtistModule,
    AlbumModule,
    AuthModule,
    UserModule,
    FileModule,
  ],
})
export class AppModule {
  constructor() {}
}
