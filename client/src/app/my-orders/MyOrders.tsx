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
    <>
      <Heading className="ml-5">Мої замовлення</Heading>
      {!orders?.length ? (
        <p className="ml-5 mt-10 text-slate-500 text-lg">Немає замовлень</p>
      ) : (
        <ul className="ml-5 mt-10">
          {orders.map(order => (
            <li key={order.id}>
              <Order data={order} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MyOrders;
