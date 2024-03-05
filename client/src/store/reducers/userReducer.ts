import { UserAction, UserActionTypes, UserState } from "@/types/user";

const initialState: UserState = {
  user: null,
  error: "",
};

export const userReducer = (
  state = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_ERROR:
      return { ...state, error: action.payload };
    case UserActionTypes.SET_USER:
      return { error: "", user: action.payload };
    case UserActionTypes.FETCH_USER:
      return { error: "", user: action.payload };
    default:
      return state;
  }
};
