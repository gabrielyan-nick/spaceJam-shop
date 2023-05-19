import { saveToStorage } from './auth.helper';
import { getContentType } from 'api/api.helper';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IAuthResponse, Tokens } from 'store/user/user.interface';

const AuthService = {
  async getNewTokens() {
    const refreshToken = Cookies.get(Tokens.RefreshToken);

    const response = await axios.post<string, { data: IAuthResponse }>(
      process.env.SERVER_URL + `/auth/login/access-token`,
      { refreshToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};

export default AuthService;
