import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserResponseDto } from 'src/users/users.dto';

const USER_PREFIX_KEY = 'user-cache.';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getUser(userId: string): Promise<User | undefined> {
    return this.cacheManager.get<User>(`${USER_PREFIX_KEY}${userId}`);
  }

  dropUser(userId: string): Promise<void> {
    return this.cacheManager.del(`${USER_PREFIX_KEY}${userId}`);
  }

  setUser(userId: string, user: UserResponseDto): Promise<void> {
    return this.cacheManager.set(`${USER_PREFIX_KEY}${userId}`, user);
  }
}
