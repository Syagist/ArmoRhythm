import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Types} from 'mongoose';
import ObjectId = Types.ObjectId

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {

    @Prop()
    id: number;

    @Prop()
    artist: string;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type:[{type:ObjectId, ref:"Comment"}]})
    comments: Comment[];

}

export const TrackSchema = SchemaFactory.createForClass(Track);
