import { ICardItem } from './card.interface';
import { IUser } from './user.interface';

export interface IOrder {
  id: string;
  items: ICardItem[];
  status: EnumOrderStatus;
  user: IUser;
  createdAt: string;
}

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}
