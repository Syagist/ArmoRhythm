import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ArtistDocument = Artist & Document;

@Schema()
export class Artist {
    @Prop()
    name: string;

    @Prop()
    picture: string;

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);