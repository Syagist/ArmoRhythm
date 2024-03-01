import { IArtist } from "@/types/artist";
import { ITrack } from "@/types/track";

export interface IAlbum {
  _id: string;
  name: string;
  picture: string;
  artists: IArtist[];
  tracks: ITrack[];
}

export interface AlbumsState {
  albums: IAlbum[];
  error: string;
}

export enum AlbumsActionTypes {
  FETCH_ALBUMS = "FETCH_ALBUMS",
  FETCH_ALBUMS_ERROR = "FETCH_ALBUMS_ERROR",
}

interface FetchAlbumsAction {
  type: AlbumsActionTypes.FETCH_ALBUMS;
  payload: IAlbum[];
}

interface FetchAlbumsErrorAction {
  type: AlbumsActionTypes.FETCH_ALBUMS_ERROR;
  payload: string;
}

export interface AlbumsAutoCompleteProps {
  onAlbumChanged: (IAlbum) => void;
}

export interface AlbumProps {
  album: IAlbum;
}

export type AlbumsAction = FetchAlbumsAction | FetchAlbumsErrorAction;
