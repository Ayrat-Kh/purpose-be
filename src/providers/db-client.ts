import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbClient extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'warn', 'error', 'info'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
