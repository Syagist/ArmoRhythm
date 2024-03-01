import { host } from "@/api";
import { ArtistsAction, ArtistsActionTypes, IArtist } from "@/types/artist";
import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "@/types/track";

export const fetchArtists = () => {
  return async (dispatch: Dispatch<ArtistsAction>) => {
    try {
      const response = await host.get(`/artists`);
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ArtistsActionTypes.FETCH_ARTISTS_ERROR,
        payload: "Error Loadin Artists",
      });
    }
  };
};

export const searchArtists = async (query: string): Promise<IArtist[]> => {
  try {
    const response = await host.get(`/artists/search`, {
      params: {
        query: query,
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
