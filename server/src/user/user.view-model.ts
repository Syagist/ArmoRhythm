import {User} from "./shemas/user.schema";
import {Track} from "../track/schemas/track.schema";

export class UserViewModel {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly picture: string;
    readonly sessionToken: string;
    readonly tracks: Track[];

    constructor(user: User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.picture = user.picture;
        this.sessionToken = user.sessionToken;
        this.tracks = user.tracks;
    }
}