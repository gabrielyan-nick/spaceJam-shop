import Product from './Product';
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
  const similarProducts = await ProductsService.getSimilar(product.id);

  return { product, similarProducts };
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
  const { product, similarProducts } = await getProduct(params);

  return (
    <main className="main">
      <section className='pl-5'>
        <Product
          initialProduct={product}
          similarProducts={similarProducts}
          slug={params.params.slug}
        />
      </section>
    </main>
  );
};

export default ProductPage;
