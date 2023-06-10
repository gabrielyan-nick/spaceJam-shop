'use client';

import { Catalog, Home, Layout } from 'components';
import { Metadata, NextPage } from 'next';
import CategoryService from 'services/category.service';
import ProductsService from 'services/product.service';
import { IProductsPagination } from 'types/product.interface';

type TParamsSlug = {
  slug: string;
};

interface ICategoryParams {
  params: TParamsSlug;
}

export const metadata: Metadata = {
  title: 'Головна сторінка | SpaceJam',
  description: '',
};

async function generateStaticParams() {
  const { data: categories } = await CategoryService.getAll();
  const paths = categories.map(cat => ({
    slug: cat.slug,
  }));

  return paths;
}

async function getProducts(params: TParamsSlug) {
  const { data: products } = await ProductsService.getByCategory(params.slug);
  const { data: category } = await CategoryService.getBySlug(params.slug);

  return { products, category };
}

const CategoryPage = async ({ params }: ICategoryParams) => {
  const data = getProducts(params);
  console.log(data);
  console.log(params);
  return (
    <Layout>
      <Catalog data={data} />
    </Layout>
  );
};

export default CategoryPage;
