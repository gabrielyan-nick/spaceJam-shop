import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';
import { UserDto } from './user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: string, selectObj: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            images: true,
            name: true,
            price: true,
            slug: true,
          },
        },
        ...selectObj,
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  async updateProfile(id: string, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already in use');

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.byId(userId);
    if (!user) throw new NotFoundException('User not found');

    const isExist = user.favorites.some(product => product.id === productId);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [isExist ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });

    return { message: 'Success' };
  }
}
