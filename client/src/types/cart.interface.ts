import { IProduct } from './product.interface';

export interface ICardItem {
  id: string;
  product: IProduct;
  quantity: number;
  price: number;
}
