import { Prisma } from '@prisma/client';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  avatarPath: true,
  password: false,
  phone: true,
};

export const returnUserFavoritesObject = {
  favorites: {
    select: {
      id: true,
      images: true,
      name: true,
      price: true,
      slug: true,
    },
  },
};
