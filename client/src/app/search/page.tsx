import { Catalog, Favorites, Layout, SearchPage } from 'components';
import { Metadata, NextPage } from 'next';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

export const metadata: Metadata = {
  title: 'Пошук | SpaceJam',
  description: '',
};

const Search: NextPage = () => {
  return <SearchPage />;
};

export default Search;
