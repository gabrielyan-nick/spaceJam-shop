import Product from './Product';
import Footer from 'components/ui/Footer';
import { Metadata } from 'next';
import React from 'react';
import ProductsService from 'services/product.service';
import { IParams } from 'types/next.interface';

export const revalidate = 60;

async function generateStaticParams() {
  const res = await ProductsService.getAll();
  const paths = res.products.map(p => ({
    slug: p.slug,
  }));

  return paths;
}

const getProduct = async ({ params }: IParams) => {
  const product = await ProductsService.getBySlug(params.slug);

  return product;
};

export const generateMetadata = async ({
  params,
}: IParams): Promise<Metadata> => {
  const data = await ProductsService.getBySlug(params.slug);

  return {
    title: `${data.name} | SpaceJam`,
    description: data.description,
    category: data.category.name,
    openGraph: {
      images: data.images || [],
      description: data.description,
    },
  };
};

const ProductPage = async (params: IParams) => {
  const product = await getProduct(params);

  return (
    <>
      <main className="main">
        <section className="lg:pl-5">
          <Product initialProduct={product} slug={params.params.slug} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
