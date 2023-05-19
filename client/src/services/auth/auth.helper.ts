import Cookies from 'js-cookie';
import { IAuthResponse, ITokens, Tokens } from 'store/user/user.interface';

export const getAccessToken = () => {
  const accessToken = Cookies.get(Tokens.AccessToken);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(Tokens.AccessToken, data.accessToken);
  Cookies.set(Tokens.RefreshToken, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(Tokens.AccessToken);
  Cookies.remove(Tokens.RefreshToken);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
