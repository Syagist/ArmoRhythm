import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'
import {Album} from "../../album/schemas/album.schema";

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop()
    name: string;

    @Prop()
    picture: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]})
    albums: Album[];
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);