import { EnumOrderStatus } from '@prisma/client';
import {
  ArrayMinSize,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class OrderDto {
  @IsOptional()
  @IsEnum(EnumOrderStatus)
  status: EnumOrderStatus;

  @ArrayMinSize(1)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  productId: string;
}

export class OrderStatusDto {
  @IsEnum(EnumOrderStatus)
  status: EnumOrderStatus;

  @IsString()
  orderId: string;
}
