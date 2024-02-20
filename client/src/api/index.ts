import axios, {InternalAxiosRequestConfig} from "axios";
import {getAccessTokenFromCookie} from "../utils/cookieUtils";
import {BASE_API} from "../utils/api_constants";

const host = axios.create(
    {
        baseURL: BASE_API
    }
)

const authHost = axios.create(
    {
        baseURL: BASE_API
    }
)


const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = getAccessTokenFromCookie();
    return config;
};

authHost.interceptors.request.use(authInterceptor);

export {
    host,
    authHost
}