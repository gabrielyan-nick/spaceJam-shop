import cn from 'clsx';
import React from 'react';

interface ILoader {
  size?: 'sm' | 'md';
}

const Loader = ({ size = 'sm' }: ILoader) => {
  return (
    <div
      className={cn(
        'w-[28px] h-[28px] text-center rounded-full blur-[1px] bg-gradient-to-t from-cyan-500 to-indigo-950 animate-spin animate-overlay',
        { 'h-[50px] w-[50px]': size === 'md' },
      )}
    >
      <div className="bg-mainPurple w-full h-full rounded-full blur-md"></div>
    </div>
  );
};

export default Loader;
