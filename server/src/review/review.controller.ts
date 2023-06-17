import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ReviewService } from './review.service';
import { ReviewDto } from './review.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('post/:productId')
  @Auth()
  async createReview(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createReview(userId, productId, dto);
  }

  @HttpCode(200)
  @Delete('delete/:reviewId')
  @Auth()
  async deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }

  @HttpCode(200)
  @Get(':productId/avg')
  async getAverageRatingById(@Param('productId') productId: string) {
    return this.reviewService.getAverageRatingById(productId);
  }
}
