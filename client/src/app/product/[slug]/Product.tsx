'use client';

import ProductDescription from './ProductDescription';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductReviewsCount from './ProductReviewsCount';
import ProductPrice from './productPriceBlock/ProductPrice';
import ProductReviews from './productReviews/ProductReviews';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heading, Modal } from 'components';
import useMediaQuery from 'hooks/useMediaQuery';
import Link from 'next/link';
import React, { useState } from 'react';
import ProductsService from 'services/product.service';
import { IProduct } from 'types/product.interface';

interface IProductPage {
  initialProduct: IProduct;
  slug?: string;
}

const Product = ({ initialProduct, slug = '' }: IProductPage) => {
  const mediaMatches = useMediaQuery('(min-width: 1280px)');

  const { data } = useQuery(
    ['get product', initialProduct.id],
    () => ProductsService.getBySlug(slug),
    { initialData: initialProduct, enabled: !!slug },
  );

  return (
    
    <div>
      <Heading className="mb-1">{data.name}</Heading>
      <Link
        href={`/category/${data.category.slug}`}
        className="text-textSecondary hover:text-textHover transition-colors text-lg"
      >
        {data.category.name}
      </Link>
      <ProductReviewsCount product={data} />
      <div className="885:flex mt-10 items-start">
        <ProductGallery images={data.images} productName={data.name} />
        <div className="2xl:flex 2xl:items-start">
          <ProductPrice
            className="mt-5 885:mt-0 885:ml-5 lg:ml-10 mb-5 2xl:mb-0 2xl:order-1"
            product={data}
          />
          {mediaMatches && (
            <ProductInfo className="ml-10" info={data.characteristics} />
          )}
        </div>
      </div>
      {!mediaMatches && (
        <ProductInfo className="mt-8" info={data.characteristics} />
      )}
      <div className="max-w-[900px] mt-8">
        <ProductDescription description={data.description} />
        <ProductReviews reviews={data.reviews} productId={data.id} />
      </div>
    </div>
  );
};

export default Product;
