import CatalogItem from './catalog-item/CatalogItem';
import { useQuery } from '@tanstack/react-query';
import ProductsService from 'services/product.service';
import { IProduct } from 'types/product.interface';

const Catalog = () => {
  const { data } = useQuery(['get all product'], () =>
    ProductsService.getAll(),
  );
  const { products }: IProduct[] = data?.data || [];
  console.log(products);

  return (
    <div className="md:w-catalogWidth  bg-secondaryDark">
      {products?.map(item => (
        <CatalogItem product={item} key={item.id} />
      ))}
    </div>
  );
};

export default Catalog;
