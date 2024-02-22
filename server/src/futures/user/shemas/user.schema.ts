import { Prop, Schema } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {Document} from 'mongoose';
import * as mongoose from 'mongoose'
import { randomString } from '../../../shared/utils/random-string';
import {Track} from "../../track/schemas/track.schema";
import {createSchemaForClassWithMethods} from "../../../shared/mongoose/create-schema";

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    picture: string;

    @Prop()
    sessionToken: string;

    @Prop()
    facebookId?: string;

    @Prop()
    googleId?: string;

    @Prop()
    appleId?: string;

    get isSocial(): boolean {
        return !!(this.facebookId || this.googleId || this.appleId);
    }

    generateSessionToken() {
        this.sessionToken = randomString(60);
    }

    validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password || '');
    }

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Track[];
}
export const UserSchema = createSchemaForClassWithMethods(User);

