import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../../types/track";
import axios from "axios";
import {BASE_API} from "../../utils/api_constants";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(`${BASE_API}/tracks`)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Error Loadin tracks'})
        }
    }
}
