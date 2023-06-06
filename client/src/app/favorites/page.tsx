import { Catalog, Favorites, Layout } from 'components';
import Header from 'components/ui/layout/header/Header';
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
  return <Favorites />;
};

export default FavPage;
