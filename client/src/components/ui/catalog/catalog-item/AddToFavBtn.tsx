'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthForm, Modal } from 'components';
import useProfile from 'hooks/useProfile';
import React, { FC, useState } from 'react';
import UserService from 'services/user.service';

export const AddToFavBtnAuth: FC<{ productId: string }> = ({ productId }) => {
  const { profile } = useProfile();
  const isFav = profile.favorites?.some(item => item.id === productId);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get profile'] });
      },
    },
  );

  return (
    <div className="absolute top-1 left-1 z-20 w-[32px] h-[32px] flex justify-center items-center bg-bgDarkBtn hover:bg-mainDark rounded-md transition-colors duration-700">
      <button onClick={() => mutate()}>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition-colors"
            d="M29.5 4.5C27.8 2.3 25.3 1 22.7 1c-2.6 0-5.1 1.3-6.7 3.5C14.4 2.3 11.9 1 9.3 1 6.7 1 4.2 2.3 2.5 4.5c-1.9 2.6-2 6.4-.3 9.3 0 0 0 .1.1.1l12.9 16.6c.2.3.5.4.8.4s.6-.1.8-.4L29.7 14s0-.1.1-.1c1.7-2.9 1.6-6.8-.3-9.4z"
            fill={isFav ? '#E92662' : '#b6a7ab'}
          />
        </svg>
      </button>
    </div>
  );
};

export const AddToFavBtnWithoutAuth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="absolute top-1 left-1 z-20 w-[32px] h-[32px] flex justify-center items-center bg-bgDarkBtn hover:bg-mainDark rounded-md transition-colors duration-700">
        <button onClick={onOpenModal}>
          <svg
            width={20}
            height={20}
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5 4.5C27.8 2.3 25.3 1 22.7 1c-2.6 0-5.1 1.3-6.7 3.5C14.4 2.3 11.9 1 9.3 1 6.7 1 4.2 2.3 2.5 4.5c-1.9 2.6-2 6.4-.3 9.3 0 0 0 .1.1.1l12.9 16.6c.2.3.5.4.8.4s.6-.1.8-.4L29.7 14s0-.1.1-.1c1.7-2.9 1.6-6.8-.3-9.4z"
              fill={'#b6a7ab'}
            />
          </svg>
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AuthForm onClose={onCloseModal} />
      </Modal>
    </>
  );
};
