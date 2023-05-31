'use client';

import { useActions } from 'hooks/useActions';
import useCart from 'hooks/useCart';
import React from 'react';
import { IProductDetails } from 'types/product.interface';

const AddToCartBtn = ({ product }: IProductDetails) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();
  const currentItem = items.find(cartItem => cartItem.product.id == product.id);
  const isInCart = items.some(item => item.product.id == product.id);

  const addRemoveCartItem = () => {
    currentItem
      ? removeFromCart({ id: currentItem.id })
      : addToCart({ product, quantity: 1, price: product.price });
  };

  return (
    <div className="top-1 right-1 icon-btn">
      <button onClick={addRemoveCartItem}>
        <svg
          width={23}
          height={23}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition-colors"
            d="M4 .75H1a1 1 0 00-1 1v.5a1 1 0 001 1h2.012l2.724 11.481A4.25 4.25 0 009.765 18V18h7.822a4 4 0 003.943-3.325l1.256-7.338A2 2 0 0020.814 5H5.997l-.78-3.289A1.25 1.25 0 004 .75zM10 21a2 2 0 11-4 0 2 2 0 014 0zM21 21a2 2 0 11-4 0 2 2 0 014 0z"
            fill={isInCart ? '#d732e6' : '#b6a7ab'}
          />
        </svg>
      </button>
    </div>
  );
};

export default AddToCartBtn;
