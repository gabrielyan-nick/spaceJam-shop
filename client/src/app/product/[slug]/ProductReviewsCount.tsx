import { ProductRating } from 'components';
import React from 'react';
import { Link } from 'react-scroll';
import { IProductDetails } from 'types/product.interface';

const ProductReviewsCount = ({ product }: IProductDetails) => {
  const reviewsLength = product.reviews.length;

  if (!reviewsLength) return null;

  return (
    <Link
      className="cursor-pointer"
      to="reviews"
      smooth
      offset={-50}
      duration={500}
    >
      <ProductRating product={product} />
    </Link>
  );
};

export default ProductReviewsCount;
