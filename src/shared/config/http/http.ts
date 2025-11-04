import axios from 'axios';
import Cookies from 'js-cookie';
import { COOKIES } from '@/shared/constants/cookies';
import { LOCALE_STORAGE } from '@/shared/constants/local-storage';
import { DEFAULT_LANGUAGE } from '../languages';
import { ResponseWithData } from '../types/http';

const API_URL = import.meta.env.VITE_API_URL;

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

async function refreshAccessToken(refreshToken: string) {
  try {
    const { data } = await axios<
      ResponseWithData<{
        token: string;
        expiration_date: string;
      }>
    >(`${API_URL}auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const accessToken = data.data.token;

    Cookies.set(COOKIES.ACCESSTOKEN, accessToken);

    return accessToken;
  } catch (error) {
    const err = error;
    throw err;
  }
}

http.interceptors.request.use(
  (config) => {
    const detectedLanguage = localStorage.getItem(LOCALE_STORAGE.I18NEXT_LNG);
    const accessToken = Cookies.get(COOKIES.ACCESSTOKEN);

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    config.headers['locale'] = detectedLanguage?.slice(0, 2) || DEFAULT_LANGUAGE;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get(COOKIES.REFRESHTOKEN);

          if (!refreshToken) {
            return Promise.reject(error.response.data);
          }

          const newAccessToken = await refreshAccessToken(refreshToken);

          http.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return http(originalRequest);
        } catch (refreshError) {
          Cookies.remove(COOKIES.ACCESSTOKEN);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: error.message,
      status: error.status,
    });
  }
);
