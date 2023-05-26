import { IUser } from 'types/user.interface';

export interface IUserState {
  email: string;
  id: string;
  googleId: string;
  name: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface IAuth extends IEmailPassword {
  name?: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}

export enum EnumTokens {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export enum EnumAuth {
  Login = 'login',
  Register = 'register',
}
