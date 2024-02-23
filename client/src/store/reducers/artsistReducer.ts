import {ArtistsAction, ArtistsActionTypes, ArtistsState} from "@/types/artist";

const initialState: ArtistsState = {
    artists: [],
    error: ''
}

export const artistsReducer = (state = initialState, action: ArtistsAction): ArtistsState => {
    switch (action.type) {
        case ArtistsActionTypes.FETCH_ARTISTS_ERROR:
            return {...state, error: action.payload}
        case ArtistsActionTypes.FETCH_ARTISTS:
            return {error: '', artists: action.payload}
        default:
            return state
    }
}
