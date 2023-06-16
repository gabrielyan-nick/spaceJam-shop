'use client';

import AddToCart from './AddToCard';
import './styles.scss';
import cn from 'clsx';
import { AddToFavBtnAuth, AddToFavBtnWithoutAuth } from 'components';
import { AttentionIcon } from 'components/ui/svg';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { IProduct, IProductDetails } from 'types/product.interface';

const ProductPrice = ({ className, product }: IProductDetails) => {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        'bg-mainDark rounded-md py-2 px-3 shrink-0 w-[270px]',
        className,
      )}
    >
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium mr-5">
          {product.price} <span className="text-lg">грн.</span>
        </p>
        <div className="h-[22px]">
          {user ? (
            <AddToFavBtnAuth size={22} productId={product.id} />
          ) : (
            <AddToFavBtnWithoutAuth size={22} />
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-textSecondary text-sm ml-1">Доставка</p>
        <div className="bg-secondaryDark rounded-2xl p-0.5 max-w-[260px]">
          <input
            className="sr-only"
            type="radio"
            name="delivery"
            value="self"
            id="self"
            checked
            readOnly
          />
          <label
            htmlFor="self"
            className="cursor-pointer mr-2 px-2 py-0.5  rounded-xl transition-colors"
          >
            Самовивіз
          </label>

          <input
            className="sr-only"
            type="radio"
            name="delivery"
            value="post"
            id="post"
            disabled
          />
          <label
            htmlFor="post"
            className="cursor-pointer px-1 py-0.5 rounded-xl transition-colors"
          >
            Космічна пошта
          </label>
        </div>
      </div>
      <div className="flex mt-1">
        <AttentionIcon size={18} className="shrink-0 ml-1" />
        <p className="text-sm text-textSecondary ml-1">
          На даний момент доступний тільки самовивіз
        </p>
      </div>
      <AddToCart product={product} />
    </div>
  );
};

export default ProductPrice;


