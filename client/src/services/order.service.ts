import { instance } from 'api/api.interceptor';
import { ordersUrl } from 'config/url';
import { IOrder } from 'types/order.interface';

const OrderService = {
  async getAll() {
    return instance.get<IOrder[]>(ordersUrl());
  },
};

export default OrderService;
