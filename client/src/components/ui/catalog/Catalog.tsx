import CatalogItem from './catalog-item/CatalogItem';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'components';
import { FC } from 'react';
import ProductsService from 'services/product.service';
import { ICatalog, IProduct } from 'types/product.interface';

const Catalog: FC<ICatalog> = ({ products, isLoading }) => {
  return (
    <section className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 mdd:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 justify-items-center 2xl:justify-items-start">
      {!!products.length && !isLoading ? (
        products?.map(item => <CatalogItem product={item} key={item.id} />)
      ) : !!products.length && isLoading ? (
        <Loader />
      ) : (
        'Пусто'
      )}
    </section>
  );
};

export default Catalog;
