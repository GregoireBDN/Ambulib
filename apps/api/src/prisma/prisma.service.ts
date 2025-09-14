import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * Connect to the database when the module is initialized
   */
  async onModuleInit(): Promise<void> {
    await (this as PrismaClient).$connect();
  }

  /**
   * Disconnect from the database when shutting down
   */
  async onModuleDestroy(): Promise<void> {
    await (this as PrismaClient).$disconnect();
  }
}
