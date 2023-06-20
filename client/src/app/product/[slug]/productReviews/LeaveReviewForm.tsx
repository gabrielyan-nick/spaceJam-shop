import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Heading, Loader } from 'components';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import ReviewService from 'services/review.service';
import { IReviewCreateFields } from 'types/review.interface';

interface ILeaveReviewForm {
  productId: string;
  closeModal: () => void;
}

const LeaveReviewForm = ({ productId, closeModal }: ILeaveReviewForm) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IReviewCreateFields>();

  const queryClient = useQueryClient();

  const { mutate, isSuccess, isLoading } = useMutation(
    ['leave review'],
    (data: IReviewCreateFields) => ReviewService.create(productId, data),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['get product', productId]);
        setTimeout(() => {
          closeModal();
          document.body.classList.remove('overflow-hidden');
        }, 1000);
      },
    },
  );

  const onSubmit: SubmitHandler<IReviewCreateFields> = data => {
    mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-2 sxx:px-7">
      <Heading className="text-center">Залиште відгук</Heading>
      <div className="mt-5">
        <Controller
          control={control}
          name="rating"
          rules={{ required: 'Вкажіть оцінку' }}
          render={({ field: { onChange, value } }) => (
            <Rating
              initialValue={value}
              onClick={onChange}
              size={30}
              transition
              fillColor="#E94560"
              SVGstyle={{ display: 'inline-block' }}
            />
          )}
        />
        <div className="h-5">
          {errors.rating && (
            <p className="ml-2 -translate-y-1 animate-overlay text-red-500 font-secondary font-bold text-lg leading-5">
              {errors.rating.message}
            </p>
          )}
        </div>

        <textarea
          placeholder="Напишіть відгук..."
          {...register('text', { required: 'Напишіть відгук' })}
          className="w-full mt-1 min-h-[100px] px-2 py-1 font-main rounded-xl bg-secondaryDark border-[3px] border-mainPurple focus:border-purple-500 transition-colors outline-none text-white resize-none"
        />
        <div className="h-5">
          {errors.text && (
            <p className="ml-2 -translate-y-3  animate-overlay text-red-500 font-secondary font-bold text-lg">
              {errors.text.message}
            </p>
          )}
          {isSuccess && !errors.rating && !errors.text && (
            <p className="text-center text-xl font-semibold text-green-600 animate-overlay">
              Успішно
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="auth-btn"
          className="w-4/6 mt-3 m-auto"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? <Loader /> : 'Залишити відгук'}
        </Button>
      </div>
    </form>
  );
};

export default LeaveReviewForm;
