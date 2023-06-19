import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto, OrderStatusDto } from './order.dto';
import { productReturnObject } from 'src/product/return-product.object';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAllUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
      },
    });
  }

  async placeOrder(dto: OrderDto, userId: string) {
    const totalPrice: number = dto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items,
        },
        user: {
          connect: { id: userId },
        },
        totalPrice,
      },
    });

    return order;
  }

  async updateStatus(dto: OrderStatusDto) {
    const order = await this.prisma.order.update({
      where: { id: dto.orderId },
      data: { status: dto.status },
    });

    return order;
  }
}
