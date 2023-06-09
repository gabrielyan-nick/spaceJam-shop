'use client';

import Order from './Order';
import { useQuery } from '@tanstack/react-query';
import { Heading } from 'components';
import React from 'react';
import OrderService from 'services/order.service';

const MyOrders = () => {
  const { data: orders } = useQuery(
    ['my orders'],
    () => OrderService.getAll(),
    { select: ({ data }) => data },
  );

  return (
    <div className="max-w-[900px] lg:pl-5">
      <Heading>Мої замовлення</Heading>
      {!orders?.length ? (
        <p className=" mt-10 text-slate-500 text-lg">Немає замовлень</p>
      ) : (
        <ul className=" mt-10 space-y-4">
          {orders.map(order => (
            <li key={order.id}>
              <Order data={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
