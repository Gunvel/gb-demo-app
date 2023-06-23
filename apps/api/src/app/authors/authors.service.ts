import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'

@Injectable()
export class AuthorsService {
  private _cacheService : Redis;

  constructor() {
    this._cacheService = new Redis(6001, "192.168.1.84");
  }

  async getTop10() {
    return await this._cacheService.zrange('authors', 0, 9, "WITHSCORES");
  }

  async setAuthor(name: string, count: number) {
    return await this._cacheService.zadd('authors', count, name);
  }
}
