'use client';

import cn from 'clsx';
import { CartItemHeader } from 'components';
import useCart from 'hooks/useCart';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React from 'react';

const HeaderCart = () => {
  const { isShow, ref, setIsShow } = useOnClickOutside(false);
  const { items, total } = useCart();

  const toggleCart = () => {
    setIsShow(isShow => !isShow);
  };

  return (
    <div className="relative h-[27px]">
      <button onClick={toggleCart} className="relative">
        <svg
          width={27}
          height={27}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 .75H1a1 1 0 00-1 1v.5a1 1 0 001 1h2.012l2.724 11.481A4.25 4.25 0 009.765 18V18h7.822a4 4 0 003.943-3.325l1.256-7.338A2 2 0 0020.814 5H5.997l-.78-3.289A1.25 1.25 0 004 .75zM10 21a2 2 0 11-4 0 2 2 0 014 0zM21 21a2 2 0 11-4 0 2 2 0 014 0z"
            className="fill-[#12adb3] hover:fill-[#1ec8ce] active:fill-[#147e81] transition-colors"
          />
        </svg>
        {!!items.length && (
          <span className="absolute -top-1 -right-2 p-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-mainPurple text-mainText animate-overlay">
            {items.length}
          </span>
        )}
      </button>

      {isShow && (
        <div
          ref={ref}
          className="pt-1 pb-2 pl-2 pr-1 animate-open absolute min-w-[220px] w-max max-w-[315px] min-h-[100px] top-[40px] rounded-lg -right-3 bg-bgPurple shadow-[#0000004f] shadow-md"
        >
          <p className="text-center text-lg font-medium mb-3">Кошик</p>

          {items.length ? (
            <div>
              <div
                className={cn(`space-y-3 cart-wrapper`, {
                  'max-h-[480px] overflow-y-scroll': items.length > 6,
                })}
              >
                {items.map(item => (
                  <CartItemHeader key={item.id} item={item} />
                ))}
              </div>
              <p className="mt-6 text-textSecondary">
                {`Загальна сума: `}
                <span className="text-mainText mr-2">{total}</span>грн.
              </p>
            </div>
          ) : (
            <p className="text-center mt-5 text-textSecondary">
              Кошик порожній
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderCart;
