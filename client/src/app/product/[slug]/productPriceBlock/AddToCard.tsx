'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import cn from 'clsx';
import { AuthForm, Button, Modal } from 'components';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import useCart from 'hooks/useCart';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import OrderService from 'services/order.service';
import { IProductDetails } from 'types/product.interface';

const AddToCart = ({ product }: IProductDetails) => {
  const { addToCart } = useActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useCart();
  const currentItem = items.find(cartItem => cartItem.product.id == product.id);
  const isInCart = items.some(item => item.product.id == product.id);
  const router = useRouter();
  const { user } = useAuth();

  const { mutate } = useMutation(
    ['create order'],
    () =>
      OrderService.placeOrder({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
        })),
      }),
    {
      onSuccess: ({ data }) => {
        router.push(`/checkout/${data.id}`);
      },
    },
  );

  const addRemoveCartItem = () => {
    currentItem
      ? onPlaceOrder()
      : addToCart({ product, quantity: 1, price: product.price });
  };

  const onPlaceOrder = () => {
    user ? mutate() : onOpenModal();
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <Button
        variant={isInCart ? 'user-widget-btn' : 'buy-btn'}
        className="w-full mt-1 px-2 py-1"
        onClick={addRemoveCartItem}
      >
        {isInCart ? 'Оформити замовлення' : 'Додати'}
        {!isInCart && (
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="transition-colors"
              d="M4 .75H1a1 1 0 00-1 1v.5a1 1 0 001 1h2.012l2.724 11.481A4.25 4.25 0 009.765 18V18h7.822a4 4 0 003.943-3.325l1.256-7.338A2 2 0 0020.814 5H5.997l-.78-3.289A1.25 1.25 0 004 .75zM10 21a2 2 0 11-4 0 2 2 0 014 0zM21 21a2 2 0 11-4 0 2 2 0 014 0z"
              fill={'#dfd3d6'}
            />
          </svg>
        )}
      </Button>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm onClose={onCloseModal} />
      </Modal>
    </>
  );
};

export default AddToCart;
