'use client';

import { DeleteIcon } from 'components/ui/svg';
import { useActions } from 'hooks/useActions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IProduct, IProductDetails } from 'types/product.interface';

interface ICheckoutItem {
  product: IProduct;
  itemId: string;
  isDelBtn?: boolean;
}

const CheckoutItem = ({ product, itemId, isDelBtn = true }: ICheckoutItem) => {
  const { removeFromCart } = useActions();
  const remove = () => removeFromCart({ id: itemId });

  return (
    <li className="flex items-center">
      <Link className="shrink-0" href={`/product/${product.slug}`}>
        <Image
          src={product.images[0]}
          width={150}
          height={100}
          alt={product.name}
          style={{
            objectFit: 'cover',
            height: '100px',
            width: '150px',
            borderRadius: '5px',
          }}
        />
      </Link>
      <div className="ml-3">
        <Link href={`/product/${product.slug}`}>
          <p className="text-lg hover:text-textHover transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-textSecondary mt-1.5">{product.category.name}</p>
      </div>
      <div className="ml-auto text-lg">
        {product.price} <span className="text-textSecondary ml-1"> грн.</span>
      </div>
      {isDelBtn && (
        <button onClick={remove} className="ml-4 shrink-0">
          <DeleteIcon />
        </button>
      )}
    </li>
  );
};

export default CheckoutItem;
