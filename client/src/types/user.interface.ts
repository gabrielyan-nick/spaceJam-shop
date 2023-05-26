import { IOrder } from "./order.interface";
import { IProduct } from "./product.interface";

export interface IUser {
  id: string;
  googleId: string;
  email: string;
  name: string;
  avatarPath: string;
  phone: string;
}

export interface IFullUser extends IUser {
  favorites: IProduct[],
  orders: IOrder[]
}

export type UserUpdateType = Partial<Omit<IUser, 'id' | 'email'>> & {
  password?: string;
  email: string;
};
