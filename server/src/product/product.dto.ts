import { Prisma } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto implements Prisma.ProductUpdateInput {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsArray()
  description?: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  images: string[];

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsObject()
  characteristics?: Prisma.InputJsonValue;
}
