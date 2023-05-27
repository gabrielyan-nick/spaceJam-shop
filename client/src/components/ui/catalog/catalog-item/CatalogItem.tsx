import { AddToCartBtn, AddToFavBtn, ProductRating } from 'components';
import Image from 'next/image';
import React, { FC } from 'react';
import { IProduct } from 'types/product.interface';

const CatalogItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="max-w-[210px]">
      <div className="relative w-[210px] h-[190px]">
        <AddToFavBtn productId={product.id} />
        <AddToCartBtn product={product} />
        <Image
          src={product.images[0]}
          alt={product.name}
          width={210}
          height={190}
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </div>
      <h3>{product.name}</h3>
      <p>{product.category?.name}</p>
      <ProductRating product={product} />
      <div>{product.price}</div>
    </div>
  );
};

export default CatalogItem;
