'use client';

import { Catalog, Categories } from 'components';
import Header from 'components/ui/Header';
import { useActions } from 'hooks/useActions';
import useProfile from 'hooks/useProfile';
import { Metadata, NextPage } from 'next';
import { FC, useEffect } from 'react';
import ProductsService from 'services/product.service';
import { useAppDispatch } from 'store/hooks';
import { IProductsPagination } from 'types/product.interface';

const Home: FC<IProductsPagination> = ({ length, products }) => {
  return (
    <>
      <Header />
      <main>
        <div className="smm:flex relative content">
          <Categories />
          <div className="sm:grow bg-secondaryDark py-6 px-3 2xl:px-6">
            <Catalog products={products} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
