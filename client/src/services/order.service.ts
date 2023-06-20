import { instance } from 'api/api.interceptor';
import { ordersUrl } from 'config/url';
import { IOrder, IOrderData, IUpdateOrderStatus } from 'types/order.interface';

const OrderService = {
  async getAll() {
    return instance.get<IOrder[]>(ordersUrl());
  },

  async placeOrder(data: IOrderData) {
    return instance.post<IOrder>(ordersUrl(), data);
  },

  async updateStatus(data: IUpdateOrderStatus) {
    return instance.post<IOrder>(ordersUrl('status'), data);
  },
};

export default OrderService;
