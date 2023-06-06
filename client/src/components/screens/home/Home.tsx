import { Catalog, Layout, Sidebar } from 'components';
import { FC } from 'react';
import { ICatalog } from 'types/product.interface';

const Home: FC<ICatalog> = ({ data }) => {
  return (
    <Layout>
      <Catalog data={data} />
    </Layout>
  );
};

export default Home;
