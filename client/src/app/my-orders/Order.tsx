'use client';

import React from 'react';
import { IOrder } from 'types/order.interface';

interface IOrderData {
  data: IOrder;
}

const Order = ({ data }: IOrderData) => {
  console.log(data);
  return <div>Order</div>;
};

export default Order;
