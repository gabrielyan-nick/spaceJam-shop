import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken);
      const user = await this.findUserByCriteria('id', result);

      return this.getUserDataWithTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    return this.getUserDataWithTokens(user);
  }

  async register(dto: AuthDto) {
    const existUser = await this.findUserByCriteria('email', dto);
    if (existUser) throw new BadRequestException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await argon2.hash(dto.password),
        name: dto.name,
      },
    });

    return this.getUserDataWithTokens(user);
  }

  async findUserByCriteria(
    criteria: string,
    user: Partial<User>,
  ): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { [criteria]: user[criteria] },
    });

    return userData;
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.findUserByCriteria('email', dto);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await argon2.verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  private getUserDataWithTokens(user: User) {
    const tokens = this.issueTokens(user.id);

    return { user: this.returnUserFields(user), ...tokens };
  }

  private issueTokens(userId: string) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });
    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
