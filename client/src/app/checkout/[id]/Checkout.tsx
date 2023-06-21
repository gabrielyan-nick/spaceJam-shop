'use client';

import CheckoutRadioBtns from '../../../components/ui/radio/RadioBtns';
import RadioBtns from '../../../components/ui/radio/RadioBtns';
import CheckoutItem from './CheckoutItem';
import { useMutation } from '@tanstack/react-query';
import { Button, Heading, Loader, Modal } from 'components';
import { AttentionIcon } from 'components/ui/svg';
import { useActions } from 'hooks/useActions';
import useCart from 'hooks/useCart';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import OrderService from 'services/order.service';
import { EnumOrderStatus } from 'types/order.interface';

const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items, total } = useCart();
  const router = useRouter();
  const { resetCart } = useActions();
  const pathname = usePathname();
  const orderId = pathname.split('/')[2];

  const { mutate, isLoading } = useMutation(
    ['confirm order'],
    () =>
      OrderService.updateStatus({ orderId, status: EnumOrderStatus.SHIPPED }),
    {
      onSuccess: () => {
        onOpenModal();
        resetCart();
      },
    },
  );

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
    router.push('/my-orders');
  };

  return (
    <>
      <section className="xl:pl-5">
        <Heading>Замовлення</Heading>
        {items.length ? (
          <div className="mt-10 max-w-[900px] bg-mainDark p-3 rounded-md">
            <ul className=" space-y-3">
              {items.map(item => (
                <CheckoutItem
                  key={item.id}
                  product={item.product}
                  itemId={item.id}
                />
              ))}
            </ul>
            <RadioBtns
              label="Доставка"
              values={['Самовивіз', 'Космічна пошта']}
              warningText="На даний момент доступний тільки самовивіз"
            />
            <RadioBtns
              label="Оплата"
              values={['Готівка', 'Банківська карта']}
              warningText="На даний момент доступна тільки оплата готівкою при отриманні"
            />
            <div className="flex flex-col 600:flex-row justify-end items-end 600:items-center mt-10">
              <p className="text-textSecondary text-xl mr-4 mb-3 600:mb-0">
                {`Загальна сума: `}
                <span className="text-mainText mr-2">{total}</span>грн.
              </p>
              <Button
                onClick={() => mutate()}
                variant="auth-btn"
                className="min-w-[230px]"
              >
                {isLoading ? <Loader /> : 'Оформити замовлення'}
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-slate-500 text-lg">Немає товарів</p>
        )}
      </section>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <div className="px-7 ">
          <Heading className="text-center">Вітаємо!</Heading>
          <p className="mt-5 text-lg">
            Замовлення #
            <span className="text-green-500 text-xl font-medium">
              {orderId.slice(-6)}
            </span>{' '}
            оформлено.
            <br />
            Повідомте номер замовлення нашому співробітнику, коли забиратимете
            товар.
          </p>
          <Button
            onClick={onCloseModal}
            className="mt-5 m-auto min-w-[150px]"
            variant="user-widget-btn"
          >
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
