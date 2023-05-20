import Cookies from 'js-cookie';
import { IAuthResponse, ITokens, EnumTokens } from 'store/user/user.interface';

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.AccessToken);
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(EnumTokens.AccessToken, data.accessToken);
  Cookies.set(EnumTokens.RefreshToken, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.AccessToken);
  Cookies.remove(EnumTokens.RefreshToken);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
