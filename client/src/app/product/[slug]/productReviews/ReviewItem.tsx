import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { IReview } from 'types/review.interface';
import formatDate from 'utils/date-format';

interface IReviewItem {
  review: IReview;
}

const ReviewItem = ({ review }: IReviewItem) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-textSecondary">
        <div className="flex items-center">
          <span className="font-medium mr-4">{review.user.name}</span>
          <Rating
            readonly
            initialValue={review.rating}
            size={20}
            allowFraction
            transition
            fillColor="#E94560"
            SVGstyle={{ display: 'inline' }}
            className='-translate-y-0.5'
          />
        </div>
        <span>{formatDate(review.createdAt)}</span>
      </div>

      <p className="">{review.text}</p>
    </div>
  );
};

export default ReviewItem;
