import { errorCatch, getContentType } from './api.helper';
import axios from 'axios';
import AuthService from 'services/auth.service';
import { StorageService } from 'services/storage.service';

export const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType(),
});

instance.interceptors.request.use(config => {
  const accessToken = StorageService.getAccessToken();
  if (config && config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (e) {
        if (errorCatch(e) === 'jwt expired') StorageService.removeFromStorage();
      }
    }

    throw error;
  },
);
