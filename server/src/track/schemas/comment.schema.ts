import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Track} from "./track.schema";
import {HydratedDocument, Types} from 'mongoose';
import ObjectId = Types.ObjectId

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    id: number;

    @Prop()
    username: string;

    @Prop()
    text: string;

    @Prop({type: ObjectId, ref: 'Track'})
    track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
