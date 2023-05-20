export interface IUser {
  id: string;
  email: string;
  name: string;
  avatarPath: string;
  phone: string;
}

export type UserUpdateType = Partial<Omit<IUser, 'id' | 'email'>> & {
  password?: string;
  email: string;
};
