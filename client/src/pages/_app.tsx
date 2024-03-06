import { AppProps } from "next/app";
import { NextThunkDispatch, wrapper } from "@/store";
import { useEffect } from "react";
import { STATUS_OK } from "@/utils/api_constants";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { host } from "@/api";
import { useActions } from "@/hooks/useActions";
import "@/styles/global.scss";
import {
  decodeAccessToken,
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
} from "@/utils/cookieUtils";

import { fetchUser } from "@/store/actions-creators/user";
import { useDispatch } from "react-redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { user, error } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch() as NextThunkDispatch;

  useEffect(() => {
    //TODO fix bug every time dispatched fetchUser
    const getUser = async () => {
      const accessToken = getAccessTokenFromCookie();
      const refreshToken = getRefreshTokenFromCookie();
      if (accessToken && refreshToken) {
        const user = decodeAccessToken(accessToken);
        await dispatch(fetchUser(user.id));
      }
    };

    if (!user) {
      getUser();
    }
  }, [user]);

  return <Component {...pageProps} />;
};
export default wrapper.withRedux(MyApp);
