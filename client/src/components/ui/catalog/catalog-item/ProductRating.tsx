import { useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import ReviewService from 'services/review.service';
import { IProductDetails } from 'types/product.interface';

const ProductRating: FC<IProductDetails> = ({ product }) => {
  const { data: rating } = useQuery(
    ['get product rating'],
    () => ReviewService.getAverageRatingById(product.id),
    {
      select: ({ data }) => data,
    },
  );
  const reviewsLength = product.reviews?.length;

  function getReviewWord(count: number) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'відгук';
    } else if (
      lastDigit >= 2 &&
      lastDigit <= 4 &&
      (lastTwoDigits < 10 || lastTwoDigits > 20)
    ) {
      return 'відгуки';
    } else {
      return 'відгуків';
    }
  }

  return (
    <div className="flex">
      <Rating initialValue={rating}  size={30} />
      {!!reviewsLength && (
        <p>{`(${reviewsLength} ${getReviewWord(reviewsLength)})`}</p>
      )}
    </div>
  );
};

export default ProductRating;
