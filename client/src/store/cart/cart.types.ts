import { ICartItem } from 'types/card.interface';

export interface ICartInitialState {
  items: ICartItem[];
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus';
}


