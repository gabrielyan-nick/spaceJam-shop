import { Catalog, CatalogPagination, Layout, Sidebar } from 'components';
import { FC } from 'react';
import { IProductsData } from 'types/product.interface';

const Home = ({ products, length }: IProductsData) => {
  return (
    <Layout>
      <CatalogPagination data={{products, length}} />
    </Layout>
  );
};

export default Home;
