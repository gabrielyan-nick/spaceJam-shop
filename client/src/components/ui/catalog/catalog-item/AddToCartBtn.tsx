'use client';

import { useActions } from 'hooks/useActions';
import useCart from 'hooks/useCart';
import React from 'react';
import { IProductDetails } from 'types/product.interface';

const AddToCartBtn = ({ product }: IProductDetails) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const currentItem = items.find(
    cartItem => cartItem.product.id === product.id,
  );

  const addRemoveCartItem = () => {
    currentItem
      ? removeFromCart({ id: currentItem.id })
      : addToCart({ product, quantity: 1, price: product.price });
  };

  return (
    <div className="absolute top-2 right-2 z-20">
      <button onClick={addRemoveCartItem}>
        <svg
          width={25}
          height={25}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity={0.15}
            d="M18 14l3-9H4.786l1.285 9h11.93z"
            fill="#000"
          />
          <path
            d="M2 3h2.5l2 14H17m0 0a2 2 0 100 4 2 2 0 000-4zM6.071 14H18l3-9H4.786M11 19a2 2 0 11-4 0 2 2 0 014 0z"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddToCartBtn;
