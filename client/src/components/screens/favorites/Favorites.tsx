import { FavoritesList, Layout } from 'components';
import useProfile from 'hooks/useProfile';
import React from 'react';

const Favorites = () => {
  return (
    <Layout>
      <FavoritesList />
    </Layout>
  );
};

export default Favorites;
