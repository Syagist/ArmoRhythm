import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "./app_constants";

export const setTokensInCookies = (
  accessToken,
  refreshToken,
  accessExpiration = 7,
  refreshExpiration = 7,
) => {
  const accessExpirationDate = new Date();
  accessExpirationDate.setDate(
    accessExpirationDate.getDate() + accessExpiration,
  );

  const refreshExpirationDate = new Date();
  refreshExpirationDate.setDate(
    refreshExpirationDate.getDate() + refreshExpiration,
  );

  Cookies.set(ACCESS_TOKEN_NAME, accessToken, {
    expires: accessExpirationDate,
    secure: true,
  });

  Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
    expires: refreshExpirationDate,
    secure: true,
  });
};

export const removeTokensFromCookies = () => {
  Cookies.remove(ACCESS_TOKEN_NAME);
  Cookies.remove(REFRESH_TOKEN_NAME);
};

export const getAccessTokenFromCookie = () => {
  return Cookies.get(ACCESS_TOKEN_NAME);
};

export const getRefreshTokenFromCookie = () => {
  return Cookies.get(REFRESH_TOKEN_NAME);
};

export const decodeAccessToken = (accessToken) => {
  try {
    return jwt.decode(accessToken);
  } catch (error) {
    console.error("Error decoding access token:", error.message);
    return null;
  }
};
