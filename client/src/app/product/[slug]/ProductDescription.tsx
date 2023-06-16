'use client';

import cn from 'clsx';
import { PrevNextArrow } from 'components/ui/svg';
import React, { useState } from 'react';

interface IProductDescription {
  description: string;
}

const ProductDescription = ({ description }: IProductDescription) => {
  const [isFullShow, setIsFullShow] = useState(false);
  const textArr = description.split('|');

  const onToggleShow = () => setIsFullShow(isFullShow => !isFullShow);

  return (
    <div className="max-w-[850px] mt-5">
      <h3 className="text-xl font-medium mb-2">Опис</h3>
      <div
        className={cn('space-y-2 overflow-hidden transition-all', {
          'max-h-[180px]': !isFullShow,
          'h-auto': isFullShow,
        })}
      >
        {textArr.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div
        className={cn(
          'relative pt-1 z-10 flex justify-center bg-secondaryDark transition-shadow',
          {
            'shadow-showMore': !isFullShow,
          },
        )}
      >
        <button
          onClick={onToggleShow}
          className="text-textSecondary flex items-center gap-1"
        >
          <span>{!isFullShow ? 'Читати повністю' : 'Сховати'}</span>
          {!isFullShow ? (
            <PrevNextArrow size={20} dir="down" />
          ) : (
            <PrevNextArrow size={20} dir="up" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;
