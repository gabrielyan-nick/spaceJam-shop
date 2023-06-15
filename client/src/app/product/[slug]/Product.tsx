'use client';

import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductPrice from './productPrice/ProductPrice';
import ProductReviewsCount from './ProductReviewsCount';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heading } from 'components';
import Link from 'next/link';
import React from 'react';
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
        <ProductPrice
          className="ml-10"
          price={data.price}
          productId={data.id}
        />
      </div>
    </div>
  );
};

export default Product;
