const createUrl =
  (prefixUrl: string) =>
  (url?: string): string =>
    url ? `${prefixUrl}/${url}` : `${prefixUrl}`;

export const authUrl = createUrl('/auth');
export const categoriesUrl = createUrl('/categories');
export const reviewsUrl = createUrl('/reviews');
export const usersUrl = createUrl('/users/profile');
export const ordersUrl = createUrl('/orders');
export const statisticsUrl = createUrl('/statistics/main');
export const paymentUrl = createUrl('/payment');
export const productsUrl = createUrl('/products');
