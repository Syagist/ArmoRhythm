import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "@/types/track";
import { host } from "@/api";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await host.get(`/tracks`);
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Error Loadin createTrack",
      });
    }
  };
};
