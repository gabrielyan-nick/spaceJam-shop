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
}

export interface IProductDetails {
  product: IProduct;
}
