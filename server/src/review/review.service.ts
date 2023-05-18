import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.review.findMany({
      select: returnReviewObject,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createReview(userId: string, productId: string, dto: ReviewDto) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) throw new NotFoundException('Product not found');

      return this.prisma.review.create({
        data: {
          ...dto,
          product: {
            connect: {
              id: productId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async deleteReview(reviewId: string) {
    try {
      await this.prisma.review.findUnique({
        where: { id: reviewId },
      });
      await this.prisma.review.delete({ where: { id: reviewId } });

      return { message: 'Success' };
    } catch (e) {
      throw new NotFoundException('Review not found');
    }
  }

  async getAverageRatingById(productId: string) {
    return await this.prisma.review
      .aggregate({
        where: {
          productId,
        },
        _avg: { rating: true },
      })
      .then(data => {
        const avg = +data._avg.rating.toFixed(1);
        return {
          rating: avg,
        };
      });
  }
}
