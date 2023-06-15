'use client';

import cn from 'clsx';
import { AddToFavBtnAuth, AddToFavBtnWithoutAuth } from 'components';
import { useAuth } from 'hooks/useAuth';
import React from 'react';

interface IProductPrice {
  price: number;
  productId: string;
  className?: string;
}

const ProductPrice = ({ price, className, productId }: IProductPrice) => {
  const { user } = useAuth();

  return (
    <div className={cn('bg-mainDark rounded-md py-2 px-3 ', className)}>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium mr-5">
          {price} <span className="text-lg">грн.</span>
        </p>
        <div className="h-[22px]">
          {user ? (
            <AddToFavBtnAuth size={22} productId={productId} />
          ) : (
            <AddToFavBtnWithoutAuth size={22} />
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-textSecondary">Доставка</p>
        <div className="bg-secondaryDark rounded-lg">
          <input type="radio" name="delivery" value="self" id="self" />
          <label htmlFor="self" className="cursor-pointer mr-2">
            Самовивіз
          </label>

          <input type="radio" name="delivery" value="post" id="post" />
          <label htmlFor="post" className="cursor-pointer">
            Космічна пошта
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
