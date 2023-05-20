import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetAllProductDto } from './dto/get-all.product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto);
  }

  @Get('similar/:productId')
  async getSimilar(@Param('productId') productId: string) {
    return this.productService.getSimilar(productId);
  }

  @Get('by-slug/:productSlug')
  async getProductBySlug(@Param('productSlug') productSlug: string) {
    return this.productService.getByIdOrSlug('slug', productSlug);
  }

  @Get(':productId')
  async getProductById(@Param('productId') id: string) {
    return this.productService.getByIdOrSlug('id', id);
  }

  @Get('by-category/:categorySlug')
  async getProductsByCategory(@Param('categorySlug') categorySlug: string) {
    return this.productService.getProductsByCategory(categorySlug);
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct() {
    return this.productService.createProduct();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() productDto: ProductDto,
  ) {
    return this.productService.updateProduct(productId, productDto);
  }

  @HttpCode(200)
  @Delete(':productId')
  @Auth()
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
