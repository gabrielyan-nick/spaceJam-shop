import { instance } from 'api/api.interceptor';
import { categoriesUrl } from 'config/url';
import { ICategory, UpdateCategory } from 'types/category.interface';

const CategoryService = {
  async getAll() {
    const { data } = await instance.get<ICategory[]>(categoriesUrl());
    return data;
  },

  async getById(id: string) {
    return instance.get<ICategory>(categoriesUrl(id));
  },

  async getBySlug(slug: string) {
    return instance.get<ICategory>(categoriesUrl(`by-slug/${slug}`));
  },

  async create() {
    return instance.post<ICategory>(categoriesUrl());
  },

  async update(id: string, name: string) {
    return instance.put<ICategory>(categoriesUrl(id), { name });
  },

  async delete(id: string) {
    return instance.delete(categoriesUrl(id));
  },
};

export default CategoryService;
