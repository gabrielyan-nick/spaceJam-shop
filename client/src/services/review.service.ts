import { instance } from 'api/api.interceptor';
import { reviewsUrl } from 'config/url';
import { IReview, IReviewCreateFields } from 'types/review.interface';

const ReviewService = {
  async getAll() {
    return instance.get<IReview[]>(reviewsUrl());
  },

  async create(productId: string, postData: IReviewCreateFields) {
    const data = instance.post<IReview>(
      reviewsUrl(`post/${productId}`),
      postData,
    );
    return data;
  },

  async delete(id: string) {
    return instance.delete(reviewsUrl(`delete/${id}`));
  },

  async getAverageRatingById(id: string) {
    return instance.get<number>(reviewsUrl(`${id}/avg`));
  },
};

export default ReviewService;
