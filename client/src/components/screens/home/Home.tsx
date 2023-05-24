'use client';

import { Catalog, Categories } from 'components';
import Header from 'components/ui/Header';
import { useActions } from 'hooks/useActions';
import { Metadata, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

const Home: NextPage = () => {
  const { logout, login } = useActions();

  // useEffect(() => {
  //   logout();
  // }, []);

  return (
    <>
      <Header />
      <main>
        <div className="md:flex md:h-bodyHeight">
          <Categories />
          <Catalog />
        </div>
      </main>
    </>
  );
};

export default Home;
