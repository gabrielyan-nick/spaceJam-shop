import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto, OrderStatusDto } from './order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAllUserOrders(@CurrentUser('id') userId: string) {
    return this.orderService.getAllUserOrders(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
    return this.orderService.placeOrder(dto, userId);
  }

  @HttpCode(200)
  @Post('status')
  updateStatus(@Body() dto: OrderStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
