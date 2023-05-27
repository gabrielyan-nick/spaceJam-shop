import { instance } from 'api/api.interceptor';
import { reviewsUrl } from 'config/url';
import { IReview, ReviewCreateType } from 'types/review.interface';

const ReviewService = {
  async getAll() {
    return instance.get<IReview[]>(reviewsUrl());
  },

  async create(id: string, data: ReviewCreateType) {
    return instance.post<IReview>(reviewsUrl(`post/${id}`), data);
  },

  async delete(id: string) {
    return instance.delete(reviewsUrl(`delete/${id}`));
  },

  async getAverageRatingById(id: string) {
    return instance.get<number>(reviewsUrl(`${id}/avg`));
  },
};

export default ReviewService;
