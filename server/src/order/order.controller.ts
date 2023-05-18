import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  async getAllUserOrders(@CurrentUser('id') userId: string) {
    return this.orderService.getAllUserOrders(userId);
  }
}
