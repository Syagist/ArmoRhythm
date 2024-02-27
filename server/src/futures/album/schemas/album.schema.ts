import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  picture: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
