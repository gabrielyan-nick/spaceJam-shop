'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Heading, Loader, Modal } from 'components';
import { DeleteIcon } from 'components/ui/svg';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import ReviewService from 'services/review.service';
import { IReview } from 'types/review.interface';
import formatDate from 'utils/date-format';

interface IReviewItem {
  review: IReview;
  productId: string;
}

const ReviewItem = ({ review, productId }: IReviewItem) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ['delete review'],
    (reviewId: string) => ReviewService.delete(reviewId),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['get product', productId]);
        setTimeout(() => onCloseModal(), 100);
      },
    },
  );

  const onDeleteReview = () => mutate(review.id);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
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
              className="-translate-y-0.5"
            />
            {review.user.id === user?.id && (
              <button onClick={onOpenModal} className="ml-3">
                <DeleteIcon size={15} />
              </button>
            )}
          </div>
          <span>{formatDate(review.createdAt)}</span>
        </div>
        <p>{review.text}</p>
      </div>

      <Modal width="sm" isOpen={isModalOpen} onClose={onCloseModal}>
        <Heading className="text-center">Видалити відгук?</Heading>
        <div className="flex justify-between px-4 mt-5">
          <Button className="px-6" variant="auth-btn" onClick={onDeleteReview}>
            {isLoading ? <Loader /> : 'Так'}
          </Button>
          <Button onClick={onCloseModal} className="px-7" variant="auth-btn">
            Ні
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ReviewItem;
