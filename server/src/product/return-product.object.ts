import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/return-category.object';
import { returnReviewObject } from 'src/review/return-review.object';

export const productReturnObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  description: true,
  price: true,
  createdAt: true,
  slug: true,
  images: true,
};

export const productReturnObjectFull: Prisma.ProductSelect = {
  ...productReturnObject,
  reviews: {
    select: returnReviewObject,
  },
  category: { select: returnCategoryObject },
};
