import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getMainStat(userId: string) {
    const user = await this.userService.byId(userId, {
      orders: { select: { items: true } },
      reviews: true,
    });

    return [
      { name: 'orders', value: user.orders.length },
      { name: 'reviews', value: user.reviews.length },
      { name: 'favorites', value: user.favorites.length },
    ];
  }
}
