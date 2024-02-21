import {AppProps} from 'next/app';
import {wrapper} from '../store';
import {useEffect} from "react";
import {getAccessTokenFromCookie, getRefreshTokenFromCookie, decodeAccessToken} from "../utils/cookieUtils";

const MyApp = ({Component, pageProps}: AppProps) => {

    useEffect(() => {
        const accessToken = getAccessTokenFromCookie();
        const refreshToken = getRefreshTokenFromCookie();

        if (accessToken && refreshToken) {
            const user = decodeAccessToken(accessToken);
        }
    })
    return <Component {...pageProps} />;
};


export default wrapper.withRedux(MyApp);
