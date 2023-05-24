import cn from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'auth-button';
}

const Button = ({ variant, children, className, ...rest }: IButton) => {
  return (
    <button
      {...rest}
      className={cn(
        'rounded-xl px-3 py-1 text-mainText text-lg font-semibold transition-colors',
        { 'bg-mainPurple hover:bg-purple-700 active:bg-purple-800': variant === 'auth-button' },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
