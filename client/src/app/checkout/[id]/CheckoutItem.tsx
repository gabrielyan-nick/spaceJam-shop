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
    <li className="flex gap-3 items-center">
      <Link className="shrink-0" href={`/product/${product.slug}`}>
        <Image
          src={product.images[0]}
          width={150}
          height={100}
          alt={product.name}
          className="object-cover w-[100px] sx:w-[150px] h-[65px] sx:h-[100px] rounded-md"
        />
      </Link>
      <div>
        <Link href={`/product/${product.slug}`}>
          <p className="text-sm sxx:text-base sx:text-lg hover:text-textHover transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-textSecondary text-sm sxx:text-base sx:mt-1.5">
          {product.category.name}
        </p>
      </div>
      <div className="ml-auto text-sm sxx:text-base md:text-lg">
        {product.price} <span className="text-textSecondary ml-1"> грн.</span>
      </div>
      {isDelBtn && (
        <button onClick={remove} className="hidden sxx:block ml-4 shrink-0">
          <DeleteIcon />
        </button>
      )}
    </li>
  );
};

export default CheckoutItem;
