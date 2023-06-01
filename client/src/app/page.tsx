import { Home } from 'components';
import { Metadata, NextPage } from 'next';
import ProductsService from 'services/product.service';
import { IProductsPagination } from 'types/product.interface';

export const metadata: Metadata = {
  title: 'Головна сторінка | SpaceJam',
  description: '',
};

export const revalidate = 10;

async function getProducts() {
  const data = await ProductsService.getAll({ page: 1, perPage: 4 });
  return data;
}

async function HomePage() {
  const data: IProductsPagination = await getProducts();

  return <Home data={data} />;
}

export default HomePage;
