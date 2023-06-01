'use client';

import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import React, { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import ReviewService from 'services/review.service';
import { IProductDetails } from 'types/product.interface';

const ProductRating: FC<IProductDetails> = ({ product }) => {
  const reviewsLength = product.reviews?.length;
  const [rating, setRating] = useState<number>(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviewsLength,
    ) || 0,
  );

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
    <div
      className={cn('flex w-full items-end', { 'mt-1': reviewsLength === 0 })}
    >
      {!!reviewsLength && (
        <>
          <Rating
            readonly
            initialValue={rating}
            size={20}
            allowFraction
            transition
            fillColor="#E94560"
            SVGstyle={{ display: 'inline' }}
          />

          <span className="text-[#E94560] ml-2 mr-3 translate-y-0.5">
            {rating}
          </span>
        </>
      )}
      <p className="text-sm text-textSecondary">{`(${reviewsLength} ${getReviewWord(
        reviewsLength,
      )})`}</p>
    </div>
  );
};

export default ProductRating;
