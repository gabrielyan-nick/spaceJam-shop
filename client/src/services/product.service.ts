import { instance } from 'api/api.interceptor';
import { productsUrl } from 'config/url';
import {
  IProduct,
  IProductFilters,
  IProductUpdate,
  IProductsPagination,
} from 'types/product.interface';

const ProductsService = {
  async getAll(queryData: IProductFilters = {}) {
    return instance.get<IProductsPagination>(productsUrl(), {
      params: queryData,
    });
  },

  async getSimilar(productId: string) {
    return instance.get<IProduct[]>(productsUrl(`similar/${productId}`));
  },

  async getById(productId: string) {
    return instance.get<IProduct>(productsUrl(productId));
  },

  async getBySlug(slug: string) {
    return instance.get<IProduct>(productsUrl(`by-slug/${slug}`));
  },

  async getByCategory(slug: string) {
    return instance.get<IProduct[]>(productsUrl(`by-category/${slug}`));
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
