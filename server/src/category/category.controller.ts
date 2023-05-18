import { CategoryService } from './category.service';
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
import { CategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }

  @Get(':categoryId')
  @Auth()
  async getById(@Param('categoryId') categoryId: string) {
    return this.categoryService.getByIdOrSlug('id', categoryId);
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getByIdOrSlug('slug', slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categoryService.updateCategory(categoryId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async createCategory() {
    return this.categoryService.createCategory();
  }

  @HttpCode(200)
  @Auth()
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
