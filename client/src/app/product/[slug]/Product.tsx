'use client';

import ProductGallery from './ProductGallery';
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
      <Heading>{data.name}</Heading>
      <Link
        href={`/category/${data.category.slug}`}
        className="text-textSecondary hover:text-textHover transition-colors text-lg mt-2 block"
      >
        {data.category.name}
      </Link>
      <ProductReviewsCount product={data} />
      <div className="flex mt-10">
        <ProductGallery images={data.images} productName={data.name}/>
      </div>
    </div>
  );
};

export default Product;
