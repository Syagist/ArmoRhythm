import { Dispatch } from "react";
import {
  SetUserAction,
  UserAction,
  UserActionTypes,
  UserModel,
  UserState,
} from "@/types/user";
import { ThunkDispatch } from "redux-thunk";
import { host } from "@/api";
import { STATUS_OK } from "@/utils/api_constants";

type AppDispatch = Dispatch<UserAction> &
  ThunkDispatch<UserState, void, UserAction>;

export const fetchUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await host.get(`/user/${id}`);
      dispatch({ type: UserActionTypes.FETCH_USER, payload: response.data });
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: "Error Loadin User",
      });
    }
  };
};
export const setUser = (payload: UserModel): SetUserAction => ({
  type: UserActionTypes.SET_USER,
  payload,
});
