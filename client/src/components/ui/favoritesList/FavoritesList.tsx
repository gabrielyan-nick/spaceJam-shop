'use client';

import Heading from '../Heading';
import Loader from '../Loader';
import { CatalogItem } from 'components';
import useProfile from 'hooks/useProfile';
import React from 'react';

const FavoritesList = () => {
  const { profile, isLoading } = useProfile();
  return (
    <>
      <Heading className="ml-5 mb-5">Улюблене</Heading>
      <section>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader size='md'/>
          </div>
        ) : !isLoading && !!profile.favorites.length ? (
          <div className="flex flex-col items-center sx:items-stretch sx:grid grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-y-8 gap-x-8 justify-items-center 2xl:justify-items-start">
            {profile.favorites.map(item => (
              <CatalogItem product={item} key={item.id} />
            ))}
          </div>
        ) : (
          <p className="ml-5 mt-10 text-slate-500 text-lg">
            Немає улюблених товарів
          </p>
        )}
      </section>
    </>
  );
};

export default FavoritesList;
