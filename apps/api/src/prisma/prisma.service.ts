import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Connect to the database when the module is initialized
   */
  async onModuleInit(): Promise<void> {
    await (this as PrismaClient).$connect();
  }
}
