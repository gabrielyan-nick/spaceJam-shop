'use client';

import {
  AddToCartBtn,
  AddToFavBtnAuth,
  AddToFavBtnWithoutAuth,
  ProductRating,
} from 'components';
import { useAuth } from 'hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import ProductsService from 'services/product.service';
import { IProduct } from 'types/product.interface';

const CatalogItem: FC<{ product: IProduct }> = ({ product }) => {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-[290px] sm:max-w-[260px]  min-w-[230px] rounded-lg bg-mainDark hover:bg-bgDark transition-shadow transition-colors  duration-300 shadow-card hover:shadow-[#222249ab] animate-open">
      <div className="relative w-full h-[190px] overflow-hidden rounded-t-lg ">
        {user ? (
          <AddToFavBtnAuth
            className="top-1 left-1 absolute icon-btn"
            productId={product.id}
          />
        ) : (
          <AddToFavBtnWithoutAuth className="top-1 left-1 absolute icon-btn" />
        )}

        <AddToCartBtn
          className="top-1 right-1 absolute icon-btn"
          product={product}
        />
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={290}
            height={190}
            priority
            className="h-full w-full object-cover transform-scale-100 hover:scale-105 transition-transform duration-1000"
          />
        </Link>
      </div>
      <div className="px-3 py-1">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg hover:text-textHover transition-colors">
            {product.name}
          </h3>
        </Link>
        <Link
          href={`/category/${product.category.slug}`}
          className="text-textSecondary hover:text-textHover transition-colors"
        >
          {product.category.name}
        </Link>
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
