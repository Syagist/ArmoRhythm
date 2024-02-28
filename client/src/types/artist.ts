export interface IArtist {
  _id: string;
  name: string;
}

export interface ArtistsState {
  artists: IArtist[];
  error: string;
}

export enum ArtistsActionTypes {
  FETCH_ARTISTS = "FETCH_ARTISTS",
  FETCH_ARTISTS_ERROR = "FETCH_ARTISTS_ERROR",
}

interface FetchArtistsAction {
  type: ArtistsActionTypes.FETCH_ARTISTS;
  payload: IArtist[];
}

interface FetchArtistsErrorAction {
  type: ArtistsActionTypes.FETCH_ARTISTS_ERROR;
  payload: string;
}

export interface ArtistsAutoCompleteProps {
  onArtistChanged: (IArtist) => void;
}

export interface ArtistProps {
  artist: IArtist;
}

export type ArtistsAction = FetchArtistsAction | FetchArtistsErrorAction;
