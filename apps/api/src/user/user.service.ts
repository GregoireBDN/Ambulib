import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    console.log('UserService.create called with:', createUserDto);
    try {
      const { password, age, ...user } = createUserDto;
      console.log('Hashing password...');
      const hashedPassword = await hash(password);
      console.log('Password hashed successfully');

      console.log('Creating user in database...');
      const result = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          age: age ? (typeof age === 'string' ? parseInt(age) : age) : null,
          ...user,
          updatedAt: new Date(),
        },
      });
      console.log('User created in database:', result);
      return result;
    } catch (error) {
      console.error('Error in UserService.create:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error;
    }
  }

  async findByEmail(email: string) {
    console.log('UserService.findByEmail called with:', email);
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log('UserService.findByEmail result:', result);
      return result;
    } catch (error) {
      console.error('Error in UserService.findByEmail:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error;
    }
  }

  async findOne(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }

  async update(userId: number, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
