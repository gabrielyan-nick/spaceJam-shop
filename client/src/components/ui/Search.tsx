'use client';

import { useQuery } from '@tanstack/react-query';
import { CatalogItem, Heading, Loader } from 'components';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ProductsService from 'services/product.service';
import Footer from './Footer';

const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');

  const { data, isLoading } = useQuery(['search products', search], () =>
    ProductsService.getAll({
      searchTerm: search as string,
    }),
  );

  return (
    <>
      <main className="main">
        <Heading className="ml-5 mb-5">
          Пошук &nbsp;
          {<span className="text-textSecondary">"{search || ''}"</span>}
        </Heading>
        <section>
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader size="md" />
            </div>
          ) : !isLoading && !!data?.products.length ? (
            <div className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-y-8 gap-x-8 justify-items-center 2xl:justify-items-start">
              {data?.products.map(item => (
                <CatalogItem product={item} key={item.id} />
              ))}
            </div>
          ) : (
            <p className="ml-5 mt-10 text-slate-500 text-lg">
              Товари не знайдені
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Search;
