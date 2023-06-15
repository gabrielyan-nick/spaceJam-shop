import cn from 'clsx';
import { productInfoObj } from 'data';
import React from 'react';

interface IProductInfo {
  info: object;
  className?: string;
}

const ProductInfo = ({ info, className = '' }: IProductInfo) => {
  const arr = Object.entries(info).map(([key, value]) => ({ key, value }));

  return (
    <div className={cn('', className)}>
      <h3 className="text-lg mb-4 font-medium">Характеристики</h3>
      <div className="grid grid-cols-2 gap-5 max-w-[400px]">
        {arr.map((item, i) => (
          <React.Fragment key={i}>
            <div className="text-textSecondary">{productInfoObj[item.key]}</div>
            <div>{item.value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
