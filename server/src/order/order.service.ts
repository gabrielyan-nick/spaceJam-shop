import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
