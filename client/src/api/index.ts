import axios, {InternalAxiosRequestConfig} from "axios";
import {getAccessTokenFromCookie} from "../utils/cookieUtils";

const host = axios.create(
    {
        baseURL: process.env.APP_API_URL
    }
)

const authHost = axios.create(
    {
        baseURL: process.env.APP_API_URL
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