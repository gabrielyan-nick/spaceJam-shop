import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  productReturnObject,
  productReturnObjectFull,
} from './return-product.object';
import { ProductDto } from './product.dto';
import { generateSlug } from 'seeder/seed';
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto';
import { PaginationService } from 'src/pagination/pagination.service';
import { Prisma } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto;
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = [];

    if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' });
    else if (sort === EnumProductSort.HIGH_PRICE)
      prismaSort.push({ price: 'desc' });
    else if (sort === EnumProductSort.OLDEST)
      prismaSort.push({ createdAt: 'asc' });
    else prismaSort.push({ createdAt: 'desc' });

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const { perPage, skip } = this.paginationService.getPagination(dto);

    const produsts = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
    });

    return {
      produsts,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter,
      }),
    };
  }

  async getByIdOrSlug(key: string, value: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          [key]: value,
        },
        select: productReturnObjectFull,
      });

      if (!product) throw new NotFoundException('Product not found');

      return product;
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

  async getProductsByCategory(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) throw new NotFoundException('Category not found');

    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: productReturnObjectFull,
    });

    if (!products) throw new NotFoundException('Products not found');

    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getByIdOrSlug('id', id);

    if (!currentProduct)
      throw new NotFoundException('Current product not found');

    const similarProducts = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category.name,
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: productReturnObject,
    });

    return similarProducts;
  }

  async createProduct() {
    const product = await this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        description: '',
        price: 0,
        characteristics: {},
      },
    });

    return { message: product.id };
  }

  async updateProduct(id: string, dto: ProductDto) {
    const { categoryId, images, name, price, description, characteristics } =
      dto;

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        slug: generateSlug(name),
        description,
        price,
        characteristics,
        images,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  async deleteProduct(id: string) {
    await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return { message: 'Success' };
  }
}
