'use client';

import { DeleteIcon } from '../svg';
import { useActions } from 'hooks/useActions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ICartItem } from 'types/cart.interface';

interface ICartItemHeader {
  item: ICartItem;
}

const CartItemHeader = ({ item }: ICartItemHeader) => {
  const { addToCart, removeFromCart } = useActions();

  const remove = () => removeFromCart({ id: item.id });

  return (
    <div className="flex items-center w-full min-w-[240px]">
      <Link className="shrink-0" href={`/product/${item.product.slug}`}>
        <Image
          src={item.product.images[0]}
          width={100}
          height={70}
          alt={item.product.name}
          style={{
            objectFit: 'cover',
            height: '70px',
            width: '100px',
            borderRadius: '5px',
          }}
        />
      </Link>
      <div className="mx-2 text-sm">
        <Link href={`/product/${item.product.slug}`}>
          <p>{item.product.name}</p>
        </Link>
        <div className="mt-1 flex gap-2">
          {item.price}
          <p className="text-textSecondary">{'грн.'}</p>
        </div>
      </div>
      <button onClick={remove} type="button" className="ml-auto mr-2 shrink-0">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CartItemHeader;
