import { CatalogByCategory, Heading } from 'components';
import { Metadata, NextPage } from 'next';
import CategoryService from 'services/category.service';
import ProductsService from 'services/product.service';

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

export const revalidate = 10;

async function generateStaticParams() {
  const categories = await CategoryService.getAll();
  const paths = categories.map(cat => ({
    slug: cat.slug,
  }));

  return paths;
}

const getCategory = async (params: TParamsSlug) => {
  const { data: products } = await ProductsService.getByCategory(params.slug);
  const { data: category } = await CategoryService.getBySlug(params.slug);

  return { products, category };
};

const CategoryPage = async ({ params }: ICategoryParams) => {
  const data = await getCategory(params);

  return (
    <main className="main">
      <Heading className="ml-5">{data.category.name}</Heading>
      <CatalogByCategory length={data.products.length} />
    </main>
  );
};

export default CategoryPage;
