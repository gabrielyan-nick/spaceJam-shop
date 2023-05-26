'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import cn from 'clsx';
import useProfile from 'hooks/useProfile';
import React, { FC } from 'react';
import UserService from 'services/user.service';

const AddToFavBtn: FC<{ productId: string }> = ({ productId }) => {
  const { profile } = useProfile();
  const { invalidateQueries } = useQueryClient();
  const isFav = profile.favorites.some(item => item.id === productId);

  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess() {
        invalidateQueries(['get profile']);
      },
    },
  );

  return (
    <div className="absolute top-1 left-2">
      <button onClick={() => mutate()}>
        <svg
          width={25}
          height={25}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.5 4.5C27.8 2.3 25.3 1 22.7 1c-2.6 0-5.1 1.3-6.7 3.5C14.4 2.3 11.9 1 9.3 1 6.7 1 4.2 2.3 2.5 4.5c-1.9 2.6-2 6.4-.3 9.3 0 0 0 .1.1.1l12.9 16.6c.2.3.5.4.8.4s.6-.1.8-.4L29.7 14s0-.1.1-.1c1.7-2.9 1.6-6.8-.3-9.4z"
            // fill="#E92662"
            className={cn({
              'fill-red-800': isFav,
              'fill-slate-400': !isFav,
            })}
          />
        </svg>
      </button>
    </div>
  );
};

export default AddToFavBtn;
