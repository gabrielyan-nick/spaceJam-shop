import { IField } from './field.interface';
import cn from 'clsx';
import { forwardRef } from 'react';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ label, error, className, style = {}, type = 'text', ...rest }, ref) => {
    return (
      <div className={cn(className)} style={style}>
        <label className={cn('ml-3 text-fuchsia-200 font-secondary text-xl')}>
          {label}
          <input
            type={type}
            ref={ref}
            {...rest}
            className="w-full px-2 py-1 font-main rounded-xl bg-secondaryDark border-[3px] border-mainPurple focus:border-purple-500 transition-colors outline-none text-white"
          />
        </label>
        <div className="h-6">
          {error && (
            <p className="ml-2 animate-overlay text-red-500 font-secondary font-bold text-lg leading-5">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

export default Field;
