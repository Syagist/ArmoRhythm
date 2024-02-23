import {host} from "@/api";
import {Dispatch} from "react";
import {ArtistsAction, ArtistsActionTypes} from "@/types/artist";

export const fetchArtists = () => {
    return async (dispatch: Dispatch<ArtistsAction>) => {
        try {
            const response = await host.get(`/artists`);
            dispatch({ type: ArtistsActionTypes.FETCH_ARTISTS, payload: response.data });
        } catch (e) {
            console.log(345)
            dispatch({
                type: ArtistsActionTypes.FETCH_ARTISTS_ERROR,
                payload: 'Error artists'})
        }
    }
}
