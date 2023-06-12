import { FavoritesList } from 'components';
import Header from 'components/ui/header/Header';
import { useActions } from 'hooks/useActions';
import useProfile from 'hooks/useProfile';
import { Metadata, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

export const metadata: Metadata = {
  title: 'Улюблене | SpaceJam',
  description: '',
};

const FavPage: NextPage = () => {
  return (
    <main className="main">
      <FavoritesList />
    </main>
  );
};

export default FavPage;
