import { cartActions } from './cart/cart.slice';
import * as userAsyncActions from './user/user.actions';
import { userActions } from './user/user.slice';

export const rootActions = {
  ...userAsyncActions,
  ...userActions,
  ...cartActions,
};
