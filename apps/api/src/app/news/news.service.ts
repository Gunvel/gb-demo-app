import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { NewsDTO } from "./dto/news-dto";
import { EditNewsDTO } from "./dto/edit-news-dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private readonly model: Model<NewsDocument>,
    @Inject(CACHE_MANAGER) private cacheService: Cache) {}

    private async _getsetCache<TParams, TValue>(cacheName: string, params: TParams, apiCallBack: (params: TParams) => Promise<TValue>): Promise<TValue> {
      const cacheValue = await this.cacheService.get<TValue>(cacheName);

      if (cacheValue)
        return cacheValue;

      const value = await apiCallBack(params);
      await this.cacheService.set(cacheName, value, 60);

      return value;
    }

    async getNews() {
      return await this._getsetCache('allNews', null, async () => {
        return await this.model.find().exec();
      });
    }

    async findOne(id: string): Promise<News> {
      return await this._getsetCache(`news-${id}`, id, async (id) => {
        return await this.model.findById(id).exec();
      });
    }

    async create(newsDto: NewsDTO): Promise<News> {
      return await new this.model({
        ...newsDto,
        createdAt: new Date(),
      }).save();
    }

    async update(id: string, newsDto: EditNewsDTO): Promise<News> {
      return await this.model.findByIdAndUpdate(id, newsDto).exec();
    }

    async delete(id: string): Promise<News> {
      return await this.model.findByIdAndDelete(id).exec();
    }
}
