import { Home } from 'components';
import { Metadata, NextPage } from 'next';
import ProductsService from 'services/product.service';
import { IProductsData } from 'types/product.interface';

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
  const data: IProductsData = await getProducts();

  return <Home products={data.products} length={data.length} />;
}

export default HomePage;
