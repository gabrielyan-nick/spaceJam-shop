import { Catalog, Categories } from 'components';
import Header from 'components/ui/layout/header/Header';
import { useActions } from 'hooks/useActions';
import { Metadata, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

export const metadata: Metadata = {
  title: 'Улюблене | SpaceJam',
  description: '',
};

const FavPage: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="md:flex md:h-bodyHeight">
          <Categories />
       
        </div>
      </main>
    </>
  );
};

export default FavPage;
