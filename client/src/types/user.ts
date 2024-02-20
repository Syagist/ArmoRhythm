import Tracks from "../pages/tracks";
import {ITrack} from "./track";

export interface UserLoginRequest {
    email: string,
    password: string
}

export interface UserRegisterRequest {
    firstName: string,
    lastName: string,
    email: string
    password: string
}

export interface UserModel {
    firstName: string,
    lastName: string,
    email: string
    _id: string
    sessionToken: string
    tracks: ITrack[]
}

