'use client';

import LeaveReviewForm from './LeaveReviewForm';
import ReviewItem from './ReviewItem';
import { AuthForm, Button, Heading, Modal } from 'components';
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { IReview } from 'types/review.interface';

interface IProductReviews {
  reviews: IReview[];
  productId: string;
}

const ProductReviews = ({ productId, reviews }: IProductReviews) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <section id="reviews" className="mt-12">
        <div className="flex mb-2 items-center">
          <h3 className="text-xl font-medium">Відгуки</h3>
          {!!reviews.length && (
            <span className="text-textSecondary ml-3 text-lg">
              {reviews.length}
            </span>
          )}
          <Button
            onClick={onOpenModal}
            className="ml-10 text-base"
            variant="user-widget-btn"
          >
            Залишити відгук
          </Button>
        </div>
        {!reviews.length && (
          <p className="text-textSecondary mt-8">Немає відгуків</p>
        )}
        {!!reviews.length && (
          <div className="mt-10 space-y-9">
            {reviews.map(review => (
              <ReviewItem
                key={review.id}
                productId={productId}
                review={review}
              />
            ))}
          </div>
        )}
      </section>

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        {user ? (
          <LeaveReviewForm productId={productId} closeModal={onCloseModal} />
        ) : (
          <AuthForm onClose={onCloseModal} />
        )}
      </Modal>
    </>
  );
};

export default ProductReviews;
