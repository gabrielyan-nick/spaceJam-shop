import { ProductRating } from 'components';
import React from 'react';
import { Link } from 'react-scroll';
import { IProductDetails } from 'types/product.interface';

const ProductReviewsCount = ({ product }: IProductDetails) => {
  const reviewsLength = product.reviews.length;

  if (!reviewsLength) return null;

  return (
    <div>
      <Link
        className="cursor-pointer inline-block"
        to="reviews"
        smooth
        offset={-50}
        duration={500}
      >
        <ProductRating product={product} />
      </Link>
    </div>
  );
};

export default ProductReviewsCount;
