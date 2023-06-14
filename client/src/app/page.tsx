import { Catalog } from 'components';
import { Metadata, NextPage } from 'next';
import CategoryService from 'services/category.service';
import ProductsService from 'services/product.service';
import { IProductsData } from 'types/product.interface';

export const metadata: Metadata = {
  title: 'Головна сторінка | SpaceJam',
  description: '',
};

export const revalidate = 60;

const getProducts = async () => {
  const products = await ProductsService.getAll();

  return products;
};

const HomePage = async () => {
  const data: IProductsData = await getProducts();

  return (
    <main className="main">
      <Catalog length={data.products.length} />
    </main>
  );
};

export default HomePage;
