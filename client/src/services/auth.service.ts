import { StorageService } from './storage.service';
import { getContentType } from 'api/api.helper';
import { instance } from 'api/api.interceptor';
import axios from 'axios';
import { authUrl } from 'config/url';
import {
  IAuthResponse,
  IEmailPassword,
  EnumTokens,
  EnumAuth,
} from 'store/user/user.interface';

const AuthService = {
  async main(type: EnumAuth, data: IEmailPassword) {
    const response = await instance.post<
      IEmailPassword,
      { data: IAuthResponse }
    >(authUrl(type), data);

    if (response.data.accessToken) StorageService.saveToStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = StorageService.getRefreshToken();

    const response = await instance.post<string, { data: IAuthResponse }>(
      process.env.SERVER_URL + authUrl(`login/access-token`),
      { refreshToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) StorageService.saveToStorage(response.data);

    return response;
  },
};

export default AuthService;
