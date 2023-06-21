'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import CheckoutItem from 'app/checkout/[id]/CheckoutItem';
import cn from 'clsx';
import { Button, Heading, Loader, Modal } from 'components';
import CheckoutRadioBtns from 'components/ui/radio/RadioBtns';
import RadioBtns from 'components/ui/radio/RadioBtns';
import { statusObj } from 'data';
import { useActions } from 'hooks/useActions';
import useCart from 'hooks/useCart';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import OrderService from 'services/order.service';
import { EnumOrderStatus, IOrder } from 'types/order.interface';
import formatDate from 'utils/date-format';

interface IOrderData {
  data: IOrder;
}

const Order = ({ data }: IOrderData) => {
  const [isFullShow, setIsFullShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { resetCart } = useActions();
  const queryClient = useQueryClient();

  const onToggleShow = () => setIsFullShow(isFullShow => !isFullShow);

  const { mutate, isLoading } = useMutation(
    ['confirm order'],
    () =>
      OrderService.updateStatus({
        orderId: data.id,
        status: EnumOrderStatus.SHIPPED,
      }),
    {
      onSuccess: () => {
        onOpenModal();
        queryClient.invalidateQueries({ queryKey: ['my orders'] });
        resetCart();
        setIsFullShow(false);
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
      <div className="bg-mainDark rounded-md ">
        <div
          onClick={onToggleShow}
          className={cn(
            'flex justify-between gap-4 px-3 py-4 hover:bg-[#491f61] transition-colors cursor-pointer',
            {
              'bg-mainDark rounded-md': !isFullShow,
              'bg-[#491f61] rounded-t-md': isFullShow,
            },
          )}
        >
          <span className='text-sm sxx:text-base'>#{data.id.slice(-6)}</span>
          <span className='text-sm sxx:text-base'>{statusObj[data.status]}</span>
          <span className="hidden sx:block">{formatDate(data.createdAt)}</span>
          <span className="text-sm sxx:text-base md:text-lg">
            {data.totalPrice}
            <span className="text-textSecondary text-base ml-1.5">грн.</span>
          </span>
        </div>
        {isFullShow && (
          <div className="px-3 pb-3 pt-8">
            <ul className="space-y-3">
              {data.items.map(item => (
                <CheckoutItem
                  isDelBtn={false}
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
                <span className="text-mainText mr-2">{data.totalPrice}</span>
                грн.
              </p>
              {data.status !== EnumOrderStatus.SHIPPED && (
                <Button
                  onClick={() => mutate()}
                  variant="auth-btn"
                  className="min-w-[230px]"
                >
                  {isLoading ? <Loader /> : 'Оформити замовлення'}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <div className="px-7 ">
          <Heading className="text-center">Вітаємо!</Heading>
          <p className="mt-5 text-lg">
            Замовлення #
            <span className="text-green-500 text-xl font-medium">
              {data.id.slice(-6)}
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

export default Order;
