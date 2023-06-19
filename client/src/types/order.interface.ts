import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

export interface IOrder {
  id: string;
  items: ICartItem[];
  status: EnumOrderStatus;
  user: IUser;
  createdAt: string;
  totalPrice: number;
}

export interface IOrderData {
  status?: EnumOrderStatus;
  items: { productId: string; quantity: number; price: number }[];
}

export interface IUpdateOrderStatus {
  status: EnumOrderStatus;
  orderId: string;
}

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}
