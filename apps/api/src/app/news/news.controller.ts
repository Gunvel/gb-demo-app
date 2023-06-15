import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { NewsService } from './news.service';

import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  async getNews() {
    return await this.newsService.getNews();
  }

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() peaceOfNews: CreateNewsDto) {
    return await this.newsService.create(peaceOfNews);
  }
}
