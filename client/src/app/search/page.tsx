import { useQuery } from '@tanstack/react-query';
import { CatalogItem, Heading, Loader, Search } from 'components';
import { Metadata, NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ProductsService from 'services/product.service';
import { useAppDispatch } from 'store/hooks';

export const metadata: Metadata = {
  title: 'Пошук | SpaceJam',
  description: '',
};

type TMeta = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export const generateMetadata = async ({
  searchParams,
  params,
}: TMeta): Promise<Metadata> => {
  const search = searchParams['q'];

  return { title: `Пошук "${search}" | SpaceJam`, description: '' };
};

const SearchPage: NextPage = () => {
  return <Search />;
};

export default SearchPage;
