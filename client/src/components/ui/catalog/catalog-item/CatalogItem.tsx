'use client';

import {
  AddToCartBtn,
  AddToFavBtnAuth,
  AddToFavBtnWithoutAuth,
  ProductRating,
} from 'components';
import { useAuth } from 'hooks/useAuth';
import Image from 'next/image';
import React, { FC, useEffect } from 'react';
import ProductsService from 'services/product.service';
import { IProduct } from 'types/product.interface';

const CatalogItem: FC<{ product: IProduct }> = ({ product }) => {
  const { user } = useAuth();

  return (
    <div className="w-10/12 max-w-[290px] min-w-[245px] rounded-lg bg-mainDark hover:bg-bgDark transition-colors transition-shadow duration-300 shadow-card hover:shadow-[#222249ab]">
      <div className="relative w-full h-[190px] overflow-hidden rounded-t-lg ">
        {user ? (
          <AddToFavBtnAuth productId={product.id} />
        ) : (
          <AddToFavBtnWithoutAuth />
        )}

        <AddToCartBtn product={product} />
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={190}
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          className="transform-scale-100 hover:scale-105 transition-transform duration-1000"
        />
      </div>
      <div className="px-3 py-1">
        <h3 className="text-lg">{product.name}</h3>
        <p className="text-textSecondary">{product.category.name}</p>
        <ProductRating product={product} />
        <div className="mt-1 flex gap-2">
          {product.price}
          <p className="text-textSecondary">{'грн.'}</p>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
