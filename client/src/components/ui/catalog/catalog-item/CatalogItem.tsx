import { AddToCartBtn, AddToFavBtn } from 'components';
import Image from 'next/image';
import React, {FC} from 'react';
import { IProduct } from 'types/product.interface';

const CatalogItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div>
      <div className="relative">
        <AddToFavBtn productId={product.id} />
        <AddToCartBtn product={product} />
        <Image src={product.images[0]} alt={product.name} width={200} />
      </div>
      <h3>{product.name}</h3>
      {/* <p>{product.category?.name}</p> */}
      <div>{product.price}</div>
    </div>
  );
};

export default CatalogItem;
function FC<T>(arg0: { product: any }) {
  throw new Error('Function not implemented.');
}
