import { ICategory } from './category.interface';
import { IReview } from './review.interface';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  slug: string;
  images: string[];
  reviews: IReview[];
  category: ICategory;
  characterictics: object;
}

export interface IProductsPagination {
  products: IProduct[];
  length: number;
}

export interface ICatalog {
  data: IProductsPagination;
}

export interface IProductDetails {
  product: IProduct;
}

export interface IProductUpdate {
  name: string;
  description?: string;
  price: number;
  images: string[];
  categoryId: string;
  characteristics?: object;
}

export interface IProductFilters {
  sort?: EnumProductSort;
  searchTerm?: string;
  page?: string | number;
  perPage?: string | number;
}

export enum EnumProductSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
