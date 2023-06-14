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
    const { data } = await axiosClassic.get<IProductsData>(productsUrl(), {
      params: queryData,
    });

    return data;
  },

  async getSimilar(productId: string) {
    const { data } = await axiosClassic.get<IProduct[]>(
      productsUrl(`similar/${productId}`),
    );
    return data;
  },

  async getById(productId: string) {
    const { data } = await axiosClassic.get<IProduct>(productsUrl(productId));
    return data;
  },

  async getBySlug(slug: string) {
    const { data } = await axiosClassic.get<IProduct>(
      productsUrl(`by-slug/${slug}`),
    );
    return data;
  },

  async getByCategory(slug: string) {
    const { data } = await axiosClassic.get<IProduct[]>(
      productsUrl(`by-category/${slug}`),
    );
    return data;
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
