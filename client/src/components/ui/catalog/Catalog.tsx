'use client';

import { PrevNextArrow } from '../svg';
import { ISelectOption } from './SortDropdown';
import CatalogItem from './catalog-item/CatalogItem';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Button, Loader, SortDropdown } from 'components';
import { FC, useState } from 'react';
import ProductsService from 'services/product.service';
import { EnumProductSort, ICatalog, IProduct } from 'types/product.interface';

const Catalog: FC<ICatalog> = ({ data }) => {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const [sortType, setSortType] = useState<ISelectOption>({
    value: EnumProductSort.NEWEST,
    label: 'Дата додавання (нові > старі)',
  });

  const { data: res = data, isLoading } = useQuery(
    ['products', sortType, page],
    () =>
      ProductsService.getAll({
        page,
        perPage,
        sort: sortType.value,
      }),
    { keepPreviousData: true },
  );

  const pagesCount = res.length / perPage;

  const onGoBack = () => {
    page !== 1 && setPage(page => page - 1);
  };

  const onGoForward = () => {
    page !== pagesCount && setPage(page => page + 1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-1/2 items-center">
        <Loader size="md" />
      </div>
    );

  return (
    <section>
      <div className="flex justify-end mr-4 mb-6">
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      </div>

      <div className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-y-8 gap-x-8 justify-items-center 2xl:justify-items-start">
        {!!res.length && !isLoading
          ? res.products.map(item => (
              <CatalogItem product={item} key={item.id} />
            ))
          : 'Пусто'}
      </div>

      <div className="flex justify-center mt-10 gap-5">
        <button disabled={page === 1} onClick={onGoBack}>
          <PrevNextArrow isActive={page !== 1} />
        </button>

        {Array.from({ length: pagesCount }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={index}
              variant={
                pageNumber === page ? 'pagination-btn-active' : 'pagination-btn'
              }
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        <button disabled={page === pagesCount} onClick={onGoForward}>
          <PrevNextArrow dir="next" isActive={page !== pagesCount} />
        </button>
      </div>
    </section>
  );
};

export default Catalog;
