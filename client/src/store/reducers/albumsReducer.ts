import { AlbumsAction, AlbumsActionTypes, AlbumsState } from "@/types/album";

const initialState: AlbumsState = {
  albums: [],
  error: "",
};

export const albumsReducer = (
  state = initialState,
  action: AlbumsAction,
): AlbumsState => {
  switch (action.type) {
    case AlbumsActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state, error: action.payload };
    case AlbumsActionTypes.FETCH_ALBUMS:
      return { error: "", albums: action.payload };
    default:
      return state;
  }
};
