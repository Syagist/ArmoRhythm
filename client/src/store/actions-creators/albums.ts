import { host } from "@/api";
import { IAlbum } from "@/types/album";
import { Dispatch } from "react";
import { AlbumsAction, AlbumsActionTypes } from "@/types/album";

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<AlbumsAction>) => {
    try {
      const response = await host.get(`/albums`);
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: AlbumsActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Error Loadin Albums",
      });
    }
  };
};

export const searchAlbums = async (query: string): Promise<IAlbum[]> => {
  try {
    const response = await host.get(`/albums/search`, {
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
