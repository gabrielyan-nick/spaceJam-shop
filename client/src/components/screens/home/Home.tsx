'use client';

import { Catalog, Sidebar } from 'components';
import Header from 'components/ui/layout/header/Header';
import { useActions } from 'hooks/useActions';
import useProfile from 'hooks/useProfile';
import { Metadata, NextPage } from 'next';
import { FC, useEffect } from 'react';
import ProductsService from 'services/product.service';
import { useAppDispatch } from 'store/hooks';
import { ICatalog, IProductsPagination } from 'types/product.interface';

const Home: FC<ICatalog> = ({ data }) => {
  return (
    <>
      <Header />
      <div className="smm:flex relative content">
        <Sidebar />
        <main className="sm:grow bg-secondaryDark py-6 px-1 sx:px-3 2xl:px-6">
          <Catalog data={data} />
        </main>
      </div>
    </>
  );
};

export default Home;
