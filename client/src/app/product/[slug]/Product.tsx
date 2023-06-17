'use client';

import ProductDescription from './ProductDescription';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductReviewsCount from './ProductReviewsCount';
import ProductPrice from './productPriceBlock/ProductPrice';
import LeaveReviewForm from './productReviews/LeaveReviewForm';
import ProductReviews from './productReviews/ProductReviews';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heading, Modal } from 'components';
import Link from 'next/link';
import React, { useState } from 'react';
import ProductsService from 'services/product.service';
import { IProduct } from 'types/product.interface';

interface IProductPage {
  initialProduct: IProduct;
  similarProducts: IProduct[];
  slug?: string;
}

const Product = ({
  initialProduct,
  similarProducts,
  slug = '',
}: IProductPage) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
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
      <div className="flex mt-10 items-start">
        <ProductGallery images={data.images} productName={data.name} />
        <ProductInfo className="ml-10" info={data.characteristics} />
        <ProductPrice className="ml-10" product={data} />
      </div>
      <div className="max-w-[850px] mt-5">
        <ProductDescription description={data.description} />
        <ProductReviews reviews={data.reviews} productId={data.id} />
      </div>
    </div>
  );
};

export default Product;
