import {host} from "./index";
import {STATUS_CREATED, STATUS_OK} from "../utils/api_constants";
import {setTokensInCookies} from "../utils/cookieUtils";
import {UserLoginRequest, UserModel, UserRegisterRequest} from "../types/user";

export const register = async (requestModel: UserRegisterRequest): Promise<UserModel> => {
    const response = await host.post(
        'auth/register',
        requestModel
    )
    if (response.status === STATUS_CREATED) {
        const data = response.data;
        setTokensInCookies(data.access_token.token, data.refresh_token.token, data.access_token.expires, data.refresh_token.expires)
    }
    return response.data.user;
}

export const login = async (requestModel: UserLoginRequest): Promise<UserModel> => {
    const response = await host.post(
        'auth/login',
        requestModel
    )
    if (response.status === STATUS_CREATED) {
        const data = response.data;
        setTokensInCookies(data.access_token.token, data.refresh_token.token, data.access_token.expires, data.refresh_token.expires)
    }
    return response.data.user;
}