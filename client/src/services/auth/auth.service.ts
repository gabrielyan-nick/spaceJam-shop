import { saveToStorage } from './auth.helper';
import { getContentType } from 'api/api.helper';
import { instance } from 'api/api.interceptor';
import axios from 'axios';
import { authUrl } from 'config/url';
import Cookies from 'js-cookie';
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

    if (response.data.accessToken) saveToStorage(response.data);

    return response.data;
  },

  async getNewTokens() {
    const refreshToken = Cookies.get(EnumTokens.RefreshToken);

    const response = await axios.post<string, { data: IAuthResponse }>(
      process.env.SERVER_URL + authUrl(`login/access-token`),
      { refreshToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};

export default AuthService;
