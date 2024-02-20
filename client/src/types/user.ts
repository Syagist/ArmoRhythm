import Tracks from "../pages/tracks";
import {ITrack, TrackActionTypes} from "./track";

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

export interface UserState {
    user: UserModel | null;
    error: string;
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    SET_USER = 'SET_USER',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: UserModel
}

export interface SetUserAction {
    type: UserActionTypes.SET_USER;
    payload: UserModel
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string
}

export type UserAction = SetUserAction | FetchUserAction | FetchUserErrorAction
