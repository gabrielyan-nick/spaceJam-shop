import { Catalog, Heading } from 'components';
import Footer from 'components/ui/Footer';
import { Metadata, NextPage } from 'next';
import CategoryService from 'services/category.service';
import ProductsService from 'services/product.service';
import { IParams, TParamsSlug } from 'types/next.interface';

export const revalidate = 60;

export const generateMetadata = async ({
  params,
}: IParams): Promise<Metadata> => {
  const data = await CategoryService.getBySlug(params.slug);

  return { title: `${data.name} | SpaceJam`, description: '' };
};

async function generateStaticParams() {
  const categories = await CategoryService.getAll();
  const paths = categories.map(cat => ({
    slug: cat.slug,
  }));

  return paths;
}

const getData = async (params: TParamsSlug) => {
  const products = await ProductsService.getByCategory(params.slug);
  const category = await CategoryService.getBySlug(params.slug);

  return { products, category };
};

const CategoryPage = async ({ params }: IParams) => {
  const data = await getData(params);

  return (
    <>
      <main className="main">
        <Heading className="ml-5">{data.category.name}</Heading>
        <Catalog length={data.products.length} slug={data.category.slug} />
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
