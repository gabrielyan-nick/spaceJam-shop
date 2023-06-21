'use client';

import { PrevNextArrow } from '../svg';
import { ISelectOption } from './SortDropdown';
import CatalogItem from './catalog-item/CatalogItem';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Button, Loader, PaginationBtns, SortDropdown } from 'components';
import useMediaQuery from 'hooks/useMediaQuery';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import ProductsService from 'services/product.service';
import { EnumProductSort, ICatalog } from 'types/product.interface';

const Catalog = ({ length, slug = '' }: ICatalog) => {
  const [page, setPage] = useState(1);
  const pathname = usePathname();
  const mediaMatches = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1350px)',
  );
  const perPage = mediaMatches ? 9 : 8;
  const [sortType, setSortType] = useState<ISelectOption>({
    value: EnumProductSort.NEWEST,
    label: 'Дата (нові > старі)',
  });

  const { data: res, isLoading } = useQuery(
    ['products', sortType, page, pathname],
    () =>
      ProductsService.getAll({
        page,
        perPage,
        sort: sortType.value,
        searchTerm: slug,
      }),
    { keepPreviousData: true },
  );

  const pagesCount = Math.ceil(length / perPage);

  const onGoBack = () => {
    page !== 1 && setPage(page => page - 1);
  };

  const onGoForward = () => {
    page !== pagesCount && setPage(page => page + 1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-96 items-center">
        <Loader size="md" />
      </div>
    );

  return (
    <section>
      {!!length ? (
        <div className="flex justify-end mr-4 mb-6">
          <SortDropdown sortType={sortType} setSortType={setSortType} />
        </div>
      ) : (
        <p className="sx:ml-5 mt-10 text-slate-500 text-lg">Товари не знайдені</p>
      )}
      <div className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-y-8 gap-x-8 justify-items-center 2xl:justify-items-start">
        {!!length &&
          !isLoading &&
          res?.products.map(item => (
            <CatalogItem product={item} key={item.id} />
          ))}
      </div>

      {!!length && (
        <PaginationBtns
          page={page}
          setPage={setPage}
          pagesCount={pagesCount}
          onGoBack={onGoBack}
          onGoForward={onGoForward}
        />
      )}
    </section>
  );
};

export default Catalog;
