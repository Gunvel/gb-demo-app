import { Body, Controller, Delete, Get, Header, Param, Post, Put } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDTO } from "./dto/news-dto";
import { EditNewsDTO } from "./dto/edit-news-dto";


@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //@UseInterceptors(CacheInterceptor)
  //@CacheKey('allNews')
  //@CacheTTL(60)
  @Get()
  async getAllNews() {
    return await this.newsService.getNews();
  }

  @Get('/:id')
  async getNews(@Param('id') id: string) {
    return await this.newsService.findOne(id);
  }

  @Post()
  @Header('Cache-Control', 'none')
  async create(@Body() news: NewsDTO) {
    return await this.newsService.create(news);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() editNewsDto: EditNewsDTO) {
    return await this.newsService.update(id, editNewsDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.newsService.delete(id);
  }
}
