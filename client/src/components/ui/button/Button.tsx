import cn from 'clsx';
import React, { ButtonHTMLAttributes, RefObject } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'auth-btn'
    | 'google-btn'
    | 'user-widget-btn'
    | 'popup-btn'
    | 'loadMore-btn'
    | 'pagination-btn'
    | 'pagination-btn-active'
    | 'buy-btn';
}

const Button = ({ variant, children, className, ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className={cn(
        'flex justify-center h-[36]  px-3 py-1 text-mainText text-lg font-semibold transition-colors',
        {
          'bg-mainPurple hover:bg-purple-700 active:bg-purple-800 rounded-xl':
            variant === 'auth-btn',
          'bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-secondaryDark rounded-xl':
            variant === 'google-btn',
          'bg-purple3 hover:bg-purple-800 active:bg-purple-950 rounded-xl':
            variant === 'user-widget-btn',
          'bg-transparent rounded-[5px] text-base  hover:bg-mainPurple active:bg-purple-900 w-full flex justify-between items-center gap-4 pl-1':
            variant === 'popup-btn',
          'bg-logoText hover:bg-purple-700 active:bg-purple-800 rounded-xl mt-9 m-auto':
            variant === 'loadMore-btn',
          'bg-darkPurple hover:bg-purple-800 rounded-xl py-2 px-4 ':
            variant === 'pagination-btn',
          'bg-greenBlue hover:bg-[#0D7377] rounded-xl py-2 px-4 ':
            variant === 'pagination-btn-active',
          'bg-[#10676d] hover:bg-[#1f7c83] active:bg-[#136a70] text-white rounded-xl flex justify-center gap-2 items-center':
            variant === 'buy-btn',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
