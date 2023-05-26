import cn from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'auth-btn' | 'google-btn' | 'user-widget-btn' | 'popup-btn';
}

const Button = ({ variant, children, className, ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className={cn(
        'flex justify-center h-[36] rounded-xl px-3 py-1 text-mainText text-lg font-semibold transition-colors',
        {
          'bg-mainPurple hover:bg-purple-700 active:bg-purple-800':
            variant === 'auth-btn',
          'bg-slate-300 hover:bg-slate-200 active:bg-slate-400 text-modalBg':
            variant === 'google-btn',
            'bg-purple3 hover:bg-purple-800 active:bg-purple-950':
            variant === 'user-widget-btn',
            'bg-transparent  hover:bg-mainPurple active:bg-purple-900 rounded-[5px] w-full flex items-center gap-4 pl-1':
            variant === 'popup-btn',
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
