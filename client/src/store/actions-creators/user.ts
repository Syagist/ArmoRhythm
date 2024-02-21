import {Dispatch} from "react";
import axios from "axios";
import {BASE_API} from "../../utils/api_constants";
import {
    SetUserAction,
    UserAction,
    UserActionTypes,
    UserModel,
    UserState
} from "../../types/user";
import {ThunkDispatch} from "redux-thunk";

type AppDispatch = Dispatch<UserAction> & ThunkDispatch<UserState, void, UserAction>;


export const fetchUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.get(`${BASE_API}/user`)
            dispatch({type: UserActionTypes.FETCH_USER, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Error Loadin User'})
        }
    }
}
export const setUser = (payload: UserModel): SetUserAction => ({
    type: UserActionTypes.SET_USER,
    payload,
});
