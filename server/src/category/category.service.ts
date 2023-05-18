import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { returnCategoryObject } from './return-category.object';
import { CategoryDto } from './category.dto';
import { generateSlug } from 'seeder/seed';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({ select: returnCategoryObject });
  }

  async getByIdOrSlug(key: string, value: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          [key]: value,
        },
        select: returnCategoryObject,
      });

      if (!category) throw new NotFoundException('Category not found');

      return category;
    } catch (e) {
      throw new NotFoundException('Category not found');
    }
  }

  async updateCategory(id: string, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
      },
    });
  }

  async createCategory() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: '',
      },
    });
  }

  async deleteCategory(id: string) {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return { message: 'Success' };
  }
}
