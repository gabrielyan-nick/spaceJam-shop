'use client';

import CatalogItem from './catalog-item/CatalogItem';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Button, Loader, SortDropdown } from 'components';
import { FC, useState } from 'react';
import ProductsService from 'services/product.service';
import { EnumProductSort, ICatalog, IProduct } from 'types/product.interface';

// const queryClient = new QueryClient();

const Catalog: FC<ICatalog> = ({ data }) => {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST,
  );

  const { data: res, isLoading } = useQuery(
    ['products'],
    () =>
      ProductsService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
    { initialData: data },
  );

  const onLoadMore = () => {
    // queryClient.invalidateQueries(['products']);
    setPage(page => page + 1);
  };

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="flex justify-end mr-4 mb-4">
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>

      <div className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 mdd:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 justify-items-center 2xl:justify-items-start">
        {!!res.length && !isLoading ? (
          res.products.map(item => <CatalogItem product={item} key={item.id} />)
        ) : !!res.products.length && isLoading ? (
          <Loader />
        ) : (
          'Пусто'
        )}
      </div>
      <Button variant="loadMore-btn" onClick={onLoadMore}>
        Завантажити ще
      </Button>
    </section>
  );
};

export default Catalog;
