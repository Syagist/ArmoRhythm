import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Album } from '../../album/schemas/album.schema';
import { Track } from '../../track/schemas/track.schema';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  albums: Album[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
