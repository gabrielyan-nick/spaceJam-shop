import { instance, axiosClassic } from 'api/api.interceptor';
import { productsUrl } from 'config/url';
import {
  IProduct,
  IProductFilters,
  IProductUpdate,
  IProductsData,
} from 'types/product.interface';

const ProductsService = {
  async getAll(queryData: IProductFilters = {}) {
    const { data } = await axiosClassic.get<IProductsData>(
      productsUrl(),
      {
        params: queryData,
      },
    );

    return data;
  },

  async getSimilar(productId: string) {
    return axiosClassic.get<IProduct[]>(productsUrl(`similar/${productId}`));
  },

  async getById(productId: string) {
    return axiosClassic.get<IProduct>(productsUrl(productId));
  },

  async getBySlug(slug: string) {
    return axiosClassic.get<IProduct>(productsUrl(`by-slug/${slug}`));
  },

  async getByCategory(slug: string) {
    return axiosClassic.get<IProduct[]>(productsUrl(`by-category/${slug}`));
  },

  async create() {
    return instance.post<IProduct>(productsUrl());
  },

  async update(productId: string, data: IProductUpdate) {
    return instance.put<IProduct>(productsUrl(productId), { data });
  },

  async delete(productId: string) {
    return instance.delete(productsUrl(productId));
  },
};

export default ProductsService;
