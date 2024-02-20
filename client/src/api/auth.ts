import {host} from "./index";
import {STATUS_CREATED} from "../utils/api_constants";
import {setTokensInCookies} from "../utils/cookieUtils";
import {UserModel, UserRegisterRequest} from "../types/user";

export const register = async (requestModel:UserRegisterRequest) : Promise<UserModel> => {
    const {data} =  await host.post(
        'auth/register',
        requestModel
    )
    if (data.status === STATUS_CREATED) {
        console.log(data);
        // setTokensInCookies()
    }
    return data.user;
}